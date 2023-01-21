import { DefaultStyles } from "../styles/global";

export const markdownStyle = {
    heading1: {
        color: DefaultStyles.PRIMARY_COLOR
    },
    heading2: {
        color: DefaultStyles.PRIMARY_COLOR
    },
    strong: {
        color: DefaultStyles.PRIMARY_COLOR
    },
    em: {
        color: DefaultStyles.PRIMARY_COLOR
    },
    text: {
        color: DefaultStyles.PRIMARY_COLOR
    },
    blockQuoteText: {
        color: DefaultStyles.PRIMARY_COLOR
    },
    blockQuoteSection: {
        flexDirection: 'row',
    },
    blockQuoteSectionBar: {
        width: 3,
        height: null,
        backgroundColor: '#DDDDDD',
        marginRight: 15,
    },
    codeBlock: {
        fontFamily: "Roboto",
        fontWeight: '500',
        backgroundColor: DefaultStyles.BACKGROUND_COLOR,
        color: DefaultStyles.PRIMARY_COLOR,
        borderRadius: 20,
        padding: 15
    },
    inlineCode: {
        fontFamily: "Roboto",
        fontWeight: '500',
        backgroundColor: DefaultStyles.BACKGROUND_COLOR,
        color: DefaultStyles.PRIMARY_COLOR,
        borderRadius: 20,
        padding: 15
    },
    tableHeader: {
        backgroundColor: 'grey',
    }
};

const example = `
# This is Heading 1
## This is Heading 2
1. List1
2. List2
* test
* test
3. List3
4. List4.

---

This text should be printed between horizontal rules

---

Below is some example to print blockquote

> Test block Quote
> Another  block Quote

this is _italic_ 
this is **strong**
Some *really* ~~basic~~ **Markdown**.


| # | Name   | Age 
|---|--------|-----|
| 1 | John   | 19  |
| 2 | Sally  | 18  |
| 3 | Stream | 20  |
`