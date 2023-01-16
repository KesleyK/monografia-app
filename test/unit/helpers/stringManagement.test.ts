import { extractFirstName, normalizeString, verifyStringInclusion } from "../../../src/helpers/stringManagement"

test('string normalization should also make it lower case and remove all whitespaces and accents', () => {
    expect(normalizeString("A mitocôndria é onde ocorre a respiração das células"))
        .toBe("amitocondriaeondeocorrearespiracaodascelulas");
});

test('veridy string inclusion should succeed', () => {
    expect(verifyStringInclusion("A normal String", "String")).toBe(true);
});

test('verify string inclusion with empty string', () => {
    expect(verifyStringInclusion("Testing", "")).toBe(true);
});

test('verify string inclusion with equal strings', () => {
    expect(verifyStringInclusion("String", "String")).toBe(true);
});

test('verify string inclusion should fail', () => {
    expect(verifyStringInclusion("Fail", "Failed")).toBe(false);
});

test("extracting first name", () => {
    expect(extractFirstName("Pedro Henrique de Brito Agnes")).toBe("Pedro");
});

test("extract first name that starts with white spaces", () => {
    expect(extractFirstName(" Kesley Kenny Vasques Guimarães")).toBe("Kesley");
});

test("extract first name with empty string", () => {
    expect(extractFirstName("")).toBe("");
});
