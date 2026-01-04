import fs from 'node:fs';
import path from 'node:path';

try {
    const srcPath = path.join(process.cwd(), 'src/generated');
    const distPath = path.join(process.cwd(), 'dist/generated');

    if (fs.existsSync(srcPath)) {
        if (fs.existsSync(distPath)) {
            fs.rmSync(distPath, { recursive: true, force: true });
            console.log('Removed existing dist/generated');
        }

        fs.cpSync(srcPath, distPath, { recursive: true });
        console.log('Generated files copied to dist/generated');
    } else {
        console.log('No src/generated directory found, skipping copy');
    }
} catch (error) {
    console.error('Error copying generated files:', error);
    process.exit(1);
}