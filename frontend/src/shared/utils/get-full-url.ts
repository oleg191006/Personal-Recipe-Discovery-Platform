type Options = {
  pathname: string;
  parameters?: Record<string, string | number>;
  searchParameters?: Record<string, string | number | boolean | undefined>;
};

export const getFullUrl = ({
  pathname,
  parameters,
  searchParameters,
}: Options) => {
  let resultUrl = pathname;

  if (parameters) {
    for (const [key, value] of Object.entries(parameters)) {
      resultUrl = resultUrl.replace(`:${key}`, String(value));
    }
  }

  if (searchParameters) {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(searchParameters)) {
      if (value !== undefined) {
        params.append(key, String(value));
      }
    }

    if ([...params].length > 0) {
      resultUrl += `?${params.toString()}`;
    }
  }

  return resultUrl;
};
