type RequestConfig = {
  token: string;
  host: string;
  base: string;
  port: string | number;
  origin: string;
};

type FileType = 'script' | 'style' | 'page';

type SetPageInfo = {
  data: { appCode: string; pageCode: string; code: string };
  name: FileType;
  template?: string;
};
