import {
  CareersError,
  closingLabel,
  experienceLabel,
  fetchCareersPage,
  fetchPosting,
  submitApplication,
} from '@/lib/careers';

/**
 * The API client the careers and apply pages share.
 *
 * The status codes matter more than the happy path here. A candidate who follows a real link to a
 * filled role must be told the role closed rather than that the page is missing, and someone who
 * presses the button twice must be told they have already applied rather than that they filled the
 * form in wrong — so each code is asserted separately.
 */
describe('careers API client', () => {
  const response = (status: number, body: unknown): Response =>
    ({
      ok: status >= 200 && status < 300,
      status,
      json: async () => body,
    }) as Response;

  let fetchSpy: ReturnType<typeof vi.fn>;

  beforeAll(() => {
    // The client refuses to call anything when no API is configured, which is the right behaviour
    // for a half-deployed site and would otherwise make every test below a no-op.
    vi.stubEnv('NEXT_PUBLIC_API_BASE_URL', 'https://api.test');
  });

  beforeEach(() => {
    fetchSpy = vi.fn();
    vi.stubGlobal('fetch', fetchSpy);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('fetchCareersPage', () => {
    it('returns the page', async () => {
      fetchSpy.mockResolvedValue(
        response(200, { businessName: 'Acme Apparels', careersSlug: 'acme-apparels', openings: [] }),
      );

      const page = await fetchCareersPage('acme-apparels');

      expect(page.businessName).toBe('Acme Apparels');
      expect(fetchSpy.mock.calls[0][0]).toContain('/api/public/careers/acme-apparels');
    });

    it('escapes the slug it was given', async () => {
      fetchSpy.mockResolvedValue(response(200, { businessName: 'X', careersSlug: 'x', openings: [] }));

      await fetchCareersPage('a b/c');

      // The slug comes out of a URL a stranger controls, so it is encoded rather than pasted into
      // a path where a slash would change which endpoint is called.
      expect(fetchSpy.mock.calls[0][0]).toContain('a%20b%2Fc');
    });

    it('reports an unknown employer as not found', async () => {
      fetchSpy.mockResolvedValue(response(404, { message: "This link doesn't match an employer." }));

      await expect(fetchCareersPage('nobody')).rejects.toMatchObject({
        kind: 'notFound',
        message: "This link doesn't match an employer.",
      });
    });

    it('reports a dropped connection as a network problem', async () => {
      fetchSpy.mockRejectedValue(new TypeError('Failed to fetch'));

      await expect(fetchCareersPage('acme')).rejects.toMatchObject({ kind: 'network' });
    });
  });

  describe('fetchPosting', () => {
    it('separates a closed role from a missing one', async () => {
      fetchSpy.mockResolvedValue(
        response(410, { message: 'This role is no longer accepting applications.' }),
      );

      const error = await fetchPosting('abc').catch((e: unknown) => e);

      expect(error).toBeInstanceOf(CareersError);
      expect((error as CareersError).kind).toBe('gone');
    });

    it('falls back to its own wording when the API sends no message', async () => {
      fetchSpy.mockResolvedValue({
        ok: false,
        status: 410,
        json: async () => {
          throw new Error('not json');
        },
      } as unknown as Response);

      await expect(fetchPosting('abc')).rejects.toMatchObject({
        kind: 'gone',
        message: 'This role is no longer accepting applications.',
      });
    });

    it('treats rate limiting as something to retry rather than a mistake by the candidate', async () => {
      fetchSpy.mockResolvedValue(response(429, {}));

      await expect(fetchPosting('abc')).rejects.toMatchObject({ kind: 'network' });
    });
  });

  describe('submitApplication', () => {
    const cv = () => new File(['%PDF-1.7'], 'cv.pdf', { type: 'application/pdf' });

    const input = (over: Record<string, unknown> = {}) => ({
      fullName: 'Ruwan Perera',
      email: 'ruwan@example.com',
      phone: '0771234567',
      cv: cv(),
      consentGiven: true,
      referredByEmployeeId: null,
      formToken: 'form-token',
      honeypot: '',
      captchaResponse: null,
      ...over,
    });

    it('posts the application as multipart form data', async () => {
      fetchSpy.mockResolvedValue(response(200, { reference: 'ABC12345', message: 'Thanks' }));

      const result = await submitApplication('abc', input());

      expect(result.reference).toBe('ABC12345');

      const init = fetchSpy.mock.calls[0][1] as RequestInit;
      expect(init.method).toBe('POST');

      const body = init.body as FormData;
      expect(body.get('fullName')).toBe('Ruwan Perera');
      expect(body.get('consentGiven')).toBe('true');
      expect((body.get('cv') as File).name).toBe('cv.pdf');
    });


    it('sends the form token and an empty honeypot', async () => {
      fetchSpy.mockResolvedValue(response(200, { reference: 'R1', message: 'Thanks' }));

      await submitApplication('abc', input());

      const body = (fetchSpy.mock.calls[0][1] as RequestInit).body as FormData;
      expect(body.get('formToken')).toBe('form-token');
      // Always present, empty for a person. Sending it only when filled would tell a script which
      // field to leave alone.
      expect(body.has('website')).toBe(true);
      expect(body.get('website')).toBe('');
    });

    it('sends what a bot would have put in the hidden field, so the server can refuse it', async () => {
      fetchSpy.mockResolvedValue(response(400, { message: 'We could not accept this submission.' }));

      await expect(
        submitApplication('abc', input({ honeypot: 'https://buy-things.example' })),
      ).rejects.toMatchObject({ kind: 'invalid' });

      const body = (fetchSpy.mock.calls[0][1] as RequestInit).body as FormData;
      expect(body.get('website')).toBe('https://buy-things.example');
    });
    it('passes a referrer through when the link carried one', async () => {
      fetchSpy.mockResolvedValue(response(200, { reference: 'R1', message: 'Thanks' }));

      await submitApplication('abc', input({ referredByEmployeeId: 'emp-1' }));

      const body = (fetchSpy.mock.calls[0][1] as RequestInit).body as FormData;
      expect(body.get('referredByEmployeeId')).toBe('emp-1');
    });

    it('omits an empty phone rather than sending a blank one', async () => {
      fetchSpy.mockResolvedValue(response(200, { reference: 'R1', message: 'Thanks' }));

      await submitApplication('abc', input({ phone: '' }));

      const body = (fetchSpy.mock.calls[0][1] as RequestInit).body as FormData;
      expect(body.has('phone')).toBe(false);
    });

    it('reports a second submission as a duplicate, not as a bad form', async () => {
      fetchSpy.mockResolvedValue(
        response(409, { message: 'You have already applied for this role.' }),
      );

      await expect(submitApplication('abc', input())).rejects.toMatchObject({
        kind: 'duplicate',
        message: 'You have already applied for this role.',
      });
    });

    it('shows the validation wording the API itself gave', async () => {
      fetchSpy.mockResolvedValue(
        response(400, { message: "That email address doesn't look right." }),
      );

      // The API writes these for the candidate, so repeating them beats inventing our own.
      await expect(submitApplication('abc', input())).rejects.toMatchObject({
        kind: 'invalid',
        message: "That email address doesn't look right.",
      });
    });

    it('does not claim the application was lost when the connection drops', async () => {
      fetchSpy.mockRejectedValue(new TypeError('Failed to fetch'));

      const error = await submitApplication('abc', input()).catch((e: unknown) => e);

      // The upload may have arrived before the connection failed, so the message says we could
      // not confirm it — never that it was not received.
      expect((error as CareersError).message).toContain("couldn't confirm");
    });

    it('reports a role that closed while the form was open', async () => {
      fetchSpy.mockResolvedValue(
        response(410, { message: 'This role is no longer accepting applications.' }),
      );

      await expect(submitApplication('abc', input())).rejects.toMatchObject({ kind: 'gone' });
    });
  });
});

describe('experienceLabel', () => {
  it('turns a band into words', () => {
    expect(experienceLabel('1_3')).toBe('1–3 years');
    expect(experienceLabel('FRESHER')).toBe('No experience needed');
  });

  it('passes an unknown band through rather than hiding the role', () => {
    expect(experienceLabel('SOMETHING_NEW')).toBe('SOMETHING_NEW');
  });

  it('has nothing to say about a role with no band', () => {
    expect(experienceLabel(null)).toBeNull();
  });
});

describe('closingLabel', () => {
  const inDays = (days: number) =>
    new Date(Date.now() + days * 86_400_000).toISOString();

  it('says nothing for a role with no closing date', () => {
    expect(closingLabel(null)).toBeNull();
  });

  it('counts down inside a fortnight, because that is what moves someone to apply', () => {
    expect(closingLabel(inDays(3))).toBe('Closes in 3 days');
  });

  it('says tomorrow and today in words', () => {
    expect(closingLabel(inDays(1))).toBe('Closes tomorrow');
    expect(closingLabel(inDays(0.2))).toBe('Closes today');
  });

  it('gives a date when the closing is far off', () => {
    expect(closingLabel(inDays(60))).toContain('Closes ');
    expect(closingLabel(inDays(60))).not.toContain('in 60 days');
  });

  it('says a past date closed rather than counting backwards', () => {
    expect(closingLabel(inDays(-5))).toContain('Closed ');
  });

  it('ignores a date it cannot read', () => {
    expect(closingLabel('not a date')).toBeNull();
  });
});
