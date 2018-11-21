import * as sourcegraph from 'sourcegraph';

export function activate(): void {
    sourcegraph.languages.registerHoverProvider([{ language: 'dockerfile' }], {
        provideHover: () => ({
            contents: { value: 'Hello world from ryan! 🎉🎉🎉' }
        })
    });
}
