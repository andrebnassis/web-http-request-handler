import { fireEvent, render, waitFor} from '@testing-library/react';
import {HttpRequestForm} from '../../component/HttpRequestForm';
import * as HttpRequestHandlerService from '../../service/HttpRequestHandler'
import  axios from 'axios';
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
        
        jest.spyOn(console, 'error').mockImplementation(() => null);
    
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
      // expect(spyOnHandleRequest.mock.calls[0]).toEqual( [{"method": "GET", "url": "http://localhost:9000/"}]);
      expect(handleHttpResponse.mock.calls.length).toEqual(1);
      expect(handleHttpResponse.mock.calls[0]).toMatchObject([mockedData]);
      
    })
      
    });

    //To test the response mocking just the axios response based on the method that we called, we need to mock the axios itself.
    //To do this, let's use a library called Axios-Mock-Adapter
    test('when axios return a response, handleHttpResponse should receive the same response', async () => {
        jest.spyOn(console, 'error').mockImplementation(() => null);
    
         const mockedData = { dummy:"mocking axios response test"};
         let mock = new MockAdapter(axios, { onNoMatch:"throwException" });
        //If you filled baseUrl and url argument o n axios, you dont need to pass the baseUrl when mock.
        //If you just fill the url argument with the entire url path, than you need to pass the exaclty path on the url argument
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

})

