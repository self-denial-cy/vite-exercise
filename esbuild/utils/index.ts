export const createScript = (src: string) => `<script type="module" src="${src}"></script>`;

export const createLink = (src: string) => `<link rel="stylesheet" href="${src}" />`;

export const generate = (scripts: string[], links: string[]) => `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  ${links.join('\n')}
</head>

<body>
  ${scripts.join('\n')}
</body>

</html>`;
