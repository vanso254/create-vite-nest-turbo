export function npmrcTemplate(): string {
    return `# Enable shamefully-hoist if needed for monorepo compatibility
# shamefully-hoist=true

# Use strict peer dependency resolution
strict-peer-dependencies=false

# Save exact versions
save-exact=false
`;
}
