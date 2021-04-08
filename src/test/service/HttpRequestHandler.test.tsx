import axios, { AxiosResponse } from "axios";
import { handleRequest} from '../../service/HttpRequestHandler'

//https://stackoverflow.com/questions/56977919/how-to-mock-axios-when-passed-a-config-w-typescript

//good article: https://www.robinwieruch.de/axios-jest
describe("http handler service", () => {

    test("mock axios client and retrieve success data", async () => {
        
        const mockedAxios = axios as jest.Mocked<typeof axios>;
        
        // const mockedData = {test:"123"};
        //reference: https://stackoverflow.com/questions/51275434/cannot-get-jest-typescript-axios-test
        //reference: https://medium.com/swlh/mock-a-library-in-jest-and-typescript-a8bec189efc3
        
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
        // await expect(handleRequest({})).resolves.toEqual("mockedData");

    });

    test("mock axios client and retrieve error data", async () => {
        
        const mockedAxios = axios as jest.Mocked<typeof axios>;
        
        // const mockedData = {test:"123"};
        //reference: https://stackoverflow.com/questions/51275434/cannot-get-jest-typescript-axios-test
        //reference: https://medium.com/swlh/mock-a-library-in-jest-and-typescript-a8bec189efc3
        
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
             return Promise.reject(new Error('Network Error'))
            }
       
            return wrapFunction
         }) as any;
        
         
         const expectedResult = await expect(handleRequest({}));
         //https://stackoverflow.com/questions/47144187/can-you-write-async-tests-that-expect-tothrow
         //https://jestjs.io/pt-BR/docs/asynchronous

         expectedResult.rejects.toThrowError("Network Error");

    });
})