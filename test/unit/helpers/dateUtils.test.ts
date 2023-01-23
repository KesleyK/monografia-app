import { getDateFromSeconds } from "../../../src/helpers/dateUtils";

test('dateUtils works accordingly', () => {
    expect(getDateFromSeconds(1672531200)).toEqual(new Date(2023, 0, 1));
});