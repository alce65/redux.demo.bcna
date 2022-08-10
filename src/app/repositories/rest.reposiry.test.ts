import { RestRepository } from './rest.repository';

interface Item {
    id: string;
}

describe('Given the class RestRepository', () => {
    describe('When we have a instance', () => {
        // DRY
        let itemMock: Item;
        let newItemMock: Item;
        let dataMock: Array<Item>;
        let repo: RestRepository<Item, Response>;
        let url: string;
        beforeEach(() => {
            itemMock = { id: '1' };
            newItemMock = { id: '2' };
            dataMock = [itemMock];
            repo = new RestRepository(url);
            url = '';
        });
        test('should be used', () => {
            expect(repo).toBeTruthy();
        });

        test('the method getAll should return all the data', async () => {
            global.fetch = jest.fn().mockResolvedValue({
                json: jest.fn().mockResolvedValue(dataMock),
            });

            const result = await repo.getAll();
            expect(result).toStrictEqual(dataMock);
        });

        test('the method get should return one item', async () => {
            global.fetch = jest.fn().mockResolvedValue({
                json: jest.fn().mockResolvedValue(itemMock),
            });

            const result = await repo.get('1');
            expect(result).toStrictEqual(itemMock);
        });

        test('the method get of an invalid id should return one error', async () => {
            const error = new Error('Not found');
            global.fetch = jest.fn().mockRejectedValue(error);

            const result = await repo.get('101');
            expect(result).toStrictEqual(error);
        });

        test('the method add should return one item', async () => {
            global.fetch = jest.fn().mockResolvedValue({
                json: jest.fn().mockResolvedValue(newItemMock),
            });

            const result = await repo.add(newItemMock);
            expect(result).toStrictEqual(newItemMock);
        });

        test('the method update should return one item', async () => {
            global.fetch = jest.fn().mockResolvedValue({
                json: jest.fn().mockResolvedValue({ id: '6' }),
            });

            const result = await repo.update(itemMock);
            expect(result).toStrictEqual({ id: '6' });
        });

        test('the method delete should return a response with a valid ok', async () => {
            global.fetch = jest.fn().mockResolvedValue({
                ok: true,
            });

            const result = await repo.delete('1');
            expect(result).toStrictEqual({ ok: true });
        });
    });
});
