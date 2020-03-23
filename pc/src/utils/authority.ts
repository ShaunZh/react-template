import { reloadAuthorized } from './Authorized';

export function removeAuthority() {
  sessionStorage.removeItem('authority');
}

// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(): string[] {
  const authorityString = sessionStorage.getItem('authority') || '[]';
  const authority = JSON.parse(authorityString);
  return authority;
}

export function setAuthority(authority: string | string[]): void {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  sessionStorage.setItem('authority', JSON.stringify(proAuthority));
  reloadAuthorized();
}

/**
 * @description: 判断authority是否在authorityList中
 */
export function checkAuthority(checkedAuth: string): boolean {
  const authorityList: string[] = getAuthority() || [];
  return authorityList.some((item) => item === checkedAuth);
}
