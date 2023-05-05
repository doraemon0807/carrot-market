interface CFUrlProp {
  variant: string;
  imgId: string;
}

export function useCFUrl({ variant, imgId }: CFUrlProp) {
  return `https://imagedelivery.net/Sal2G4jaXIdS7QySb_hqmQ/${imgId}/${variant}`;
}

export function cls(...classnames: string[]) {
  return classnames.join(" ");
}
