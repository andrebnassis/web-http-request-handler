import { fireEvent, render, waitFor} from '@testing-library/react';
import {HttpRequestForm} from '../../component/HttpRequestForm';
import * as HttpRequestHandlerService from '../../service/HttpRequestHandler'
import  axios, { AxiosResponse } from 'axios';
import  MockAdapter from 'axios-mock-adapter';


afterEach(() => {    
    jest.restoreAllMocks();
  });

describe("Test HttpRequest Form -> Submit", () => {

    test('when API is not running should throw a Network Error', async () => {

        jest.spyOn(console, 'error').mockImplementation(() => null);
        let spyOnHandleRequest = jest.spyOn(
            HttpRequestHandlerService, 'handleRequest'
        );

        let handleHttpResponse = jest.fn();
        const { getByText} = render(<HttpRequestForm handleHttpResponse={handleHttpResponse} />);
    
      const sendButton = getByText(/send/);
      expect(sendButton).toBeInTheDocument();
    
      spyOnHandleRequest.mockClear();
      handleHttpResponse.mockClear();
      expect(handleHttpResponse.mock.calls.length).toEqual(0);
    
      fireEvent.click(sendButton);
      await waitFor(() => {
      
      expect(handleHttpResponse.mock.calls.length).toEqual(1);
      expect(spyOnHandleRequest.mock.calls.length).toEqual(1);
      expect(handleHttpResponse.mock.calls[0]).toMatchObject([new Error("Network Error")]);
      
    })

    });


    //Here we are not mocking the axios request itself, but our service that encapsulates the axios code.
    //On this way, axios will not be executed.
    test('when handleRequest returns a response, handleHttpResponse should receive the same response', async () => {
        
        const mockedData = {dummy:"test"};

        //Another way to mock the service response
        // const spyOnHandleRequest = jest.spyOn(
        //     HttpRequestHandlerService, 'handleRequest'
        // ).mockReturnValue(
        //     //@ts-ignore
        //     Promise.resolve(mockedData));
        
        const spyOnHandleRequest = jest.spyOn(
            HttpRequestHandlerService, 'handleRequest'
        ).mockImplementation(() => Promise.resolve(mockedData));

        const handleHttpResponse = jest.fn();
        const {getByText} = render(<HttpRequestForm handleHttpResponse={handleHttpResponse} />);
    
      const sendButton = getByText(/send/);
      expect(sendButton).toBeInTheDocument();
    
      spyOnHandleRequest.mockClear();
      handleHttpResponse.mockClear();
      expect(handleHttpResponse.mock.calls.length).toEqual(0);
    
      fireEvent.click(sendButton);
      await waitFor(() => {
      expect(spyOnHandleRequest.mock.calls.length).toEqual(1);
      expect(spyOnHandleRequest.mock.calls[0]).toMatchObject( [{"data": "", "headers": {}, "method": "GET", "baseURL": "http://localhost:9000","url": "/"}]);
      expect(handleHttpResponse.mock.calls.length).toEqual(1);
      expect(handleHttpResponse.mock.calls[0]).toMatchObject([mockedData]);
      
    })
      
    });

    //To test the response mocking just the axios response based on the method that we called, we need to mock the axios itself.
    //Way 1: Using a library called Axios-Mock-Adapter
    test('way1: when axios return a response, handleHttpResponse should receive the same response', async () => {
         const mockedData = { dummy:"mocking axios response test"};
         let mock = new MockAdapter(axios, { onNoMatch:"throwException" });
        //If you filled baseUrl and url argument o n axios, you dont need to pass the baseUrl when mock.
        //If you just fill the url argument , then you need to pass the exaclty path on the url argument to the mock
         mock.onGet("/").reply(200,mockedData);
    
         const handleHttpResponse = jest.fn();
         const {getByText} = render(<HttpRequestForm handleHttpResponse={handleHttpResponse} />);
        
          const sendButton = getByText(/send/);
          expect(sendButton).toBeInTheDocument();
        
          handleHttpResponse.mockClear();
          expect(handleHttpResponse.mock.calls.length).toEqual(0);
        
          fireEvent.click(sendButton);
          
          await waitFor(() => {
          expect(handleHttpResponse.mock.calls.length).toEqual(1);
          expect(handleHttpResponse.mock.calls[0]).toMatchObject([mockedData]);
        });
    
        mock.restore();
    });

    
    //Way 2: Mocking axios instance response itself
    test('way2: when axios return a response, handleHttpResponse should receive the same response', async () => {
      
      const mockedAxios = axios as jest.Mocked<typeof axios>;

      const mockedData = { dummy:"mocking axios response test"};
      const axiosResponse: AxiosResponse = {
          data: mockedData,
          status: 200,
          statusText: 'OK',
          config: {},
          headers: {},
        };

      mockedAxios.create = jest.fn((config) => {
        const wrapFunction = (param:any) => {
            
            //console.log({param});
            // { param:
            //   { 
            //    baseURL: 'http://localhost:9000',
            //    url: '/',
            //    method: 'GET' 
            //    } 
            // }
           return Promise.resolve(axiosResponse)
          }
     
          return wrapFunction
       }) as any;
       
         //If you filled baseUrl and url argument o n axios, you dont need to pass the baseUrl when mock.
        //If you just fill the url argument with the entire url path, than you need to pass the exaclty path on the url argument
         
         const handleHttpResponse = jest.fn();
         const {getByText} = render(<HttpRequestForm handleHttpResponse={handleHttpResponse} />);
        
          const sendButton = getByText(/send/);
          expect(sendButton).toBeInTheDocument();
        
          handleHttpResponse.mockClear();
          expect(handleHttpResponse.mock.calls.length).toEqual(0);
        
          fireEvent.click(sendButton);
          
          await waitFor(() => {
          expect(handleHttpResponse.mock.calls.length).toEqual(1);
          expect(handleHttpResponse.mock.calls[0]).toMatchObject([mockedData]);
        });
    
    });
})

