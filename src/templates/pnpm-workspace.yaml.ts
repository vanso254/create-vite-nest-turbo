export function pnpmWorkspaceTemplate(): string {
    return `packages:
  - "apps/*"
  - "packages/*"
`;
}
