import { addData, getData } from './apiClient';

describe('API Client', () => {
    it('should add data successfully', async () => {
        const id = 'test1';
        const value = { name: 'Test Data' };

        const response = await addData(id, value);
        expect(response.message).toBe('Data added successfully');
    });

    it('should get data successfully', async () => {
        const id = 'test1';

        const response = await getData(id);
        expect(response.data).toEqual({ name: 'Test Data' });
    });
});
