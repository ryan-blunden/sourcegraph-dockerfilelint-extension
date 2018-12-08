import { DecorationAttachmentRenderOptions, Hover, MarkupKind, Position, Range, TextDocument, TextDocumentDecoration } from 'sourcegraph';
import { Lint, LintResult } from './api';
import { activeEditor } from './utils';

function getDecorations(result: LintResult): TextDocumentDecoration[] {
    const linesProcessed = new Set()

    return (result.lint.filter(lint => {
        if(!linesProcessed.has(lint.line)) {
            linesProcessed.add(lint.line)
            return true
        }
    })).map(lint => ({
            range: new Range(lint.line - 1, 0, lint.line - 1, lint.lint.length - 1), // -1 because lines are 0 indexed
            border: 'solid',
            borderWidth: '0 0 0 10px',
            borderColor: 'red',
            backgroundColor: 'hsla(0,100%,50%, 0.2)',
            after: {
                contentText: '❗'
            }
        })
    )
}

export function decorate(result: LintResult): void {
    const editor = activeEditor()
    if(!editor) {
        return
    }

    editor.setDecorations(null, getDecorations(result))
}
            // )
        //     if(!lint.line in linesDecorated) {
        //         linesDecorated.push(lint)
        //         return true
        //     }
        //     return false
        // })
        // .map((lint) => {
        //     range: new Range(lint.line - 1, 0, lint.line - 1, lint.lint.length - 1), // -1 because lines are 0 indexed
        //     border: 'solid',
        //     borderWidth: '0 0 0 10px',
        //     borderColor: 'red',
        //     backgroundColor,
        //     after: {
        //         contentText: '❗'
        //     }
        // })
    // })()
//     let decorations: TextDocumentDecoration[] = []
//     console.log(decorations)
//     // editor.setDecorations(null, decorations)
//     for(const lint of result.lint) {
//         const decorations: TextDocumentDecoration[] = result.lint.filter(lint => ({
//         range: new Range(lint.line - 1, 0, lint.line - 1, lint.lint.length - 1), // -1 because lines are 0 indexed
//         border: 'solid',
//         borderWidth: '0 0 0 10px',
//         borderColor: 'red',
//         backgroundColor,
//         after: {
//             contentText: '❗'
//         }
//     }))

//     editor.setDecorations(null, decorations)
// }

export function getHover(dockerfile: string, position: Position, result: LintResult): Hover | null {
    const content = (lint: Lint[]): string =>
        ['# Dockerfile lint recommendations\n---\n'].concat(lint.map(lint => lint.lint)).join('\n- \n')

    if(!result || !result.lintForLine[position.line+1]) {
        return null
    }

    const lint = result.lintForLine[position.line+1]
    const lineCharCount = dockerfile.split('\n')[position.line+1].length - 1
    const range = new Range(position.line+1, 0, position.line+1, lineCharCount)

    return {
        contents: {
            value: content(lint),
            kind: MarkupKind.Markdown // bug
        },
        range
    }
}
