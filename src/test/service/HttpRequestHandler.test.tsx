import axios, { AxiosResponse } from "axios";
import { handleRequest} from '../../service/HttpRequestHandler'

describe("http handler service", () => {

    test("mock axios client and retrieve success data", async () => {
        
        const mockedAxios = axios as jest.Mocked<typeof axios>;

        const mockedHttpResponseData = 'fake data';
        const axiosResponse: AxiosResponse = {
            data: mockedHttpResponseData,
            status: 200,
            statusText: 'OK',
            config: {},
            headers: {},
          };

        mockedAxios.create = jest.fn((config) => {
            const wrapFunction = (param:any) => {
             return Promise.resolve(axiosResponse)
            }
       
            return wrapFunction
         }) as any;
        
        const actual = await handleRequest({});
        expect(actual).toBe("fake data");

    });

    test("mock axios client and retrieve error data", async () => {
        
        const mockedAxios = axios as jest.Mocked<typeof axios>;
        
        mockedAxios.create = jest.fn((config) => {
            const wrapFunction = (param:any) => {
             return Promise.reject(new Error('Network Error'))
            }
       
            return wrapFunction
         }) as any;
        
         
         const expectedResult = await expect(handleRequest({}));
         expectedResult.rejects.toThrowError("Network Error");

    });
})