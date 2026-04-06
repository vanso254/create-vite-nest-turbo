export function validateProjectName(projectName: string): boolean {
    if (!projectName) {
        return false;
    }
    // Check for invalid characters according to npm naming conventions
    // (simplified version for basic validation)
    const validPattern = /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;
    
    if (!validPattern.test(projectName)) {
        return false;
    }
    
    return true;
}
