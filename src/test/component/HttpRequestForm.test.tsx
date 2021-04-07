import React from 'react';
import { fireEvent, render, waitFor} from '@testing-library/react';
import {HttpRequestForm} from '../../component/HttpRequestForm';
import * as HttpRequestHandlerService from '../../service/HttpRequestHandler'

describe("Test HttpRequest Form -> Submit", () => {

    test('when API is not running should throw a Network Error', async () => {

        jest.spyOn(console, 'error').mockImplementation(() => null);
        const spyOnHandleRequest = jest.spyOn(
            HttpRequestHandlerService, 'handleRequest'
        );

        const handleHttpResponse = jest.fn();
        const { getByText} = render(<HttpRequestForm handleHttpResponse={handleHttpResponse} />);
    
      const sendButton = getByText(/send/);
      expect(sendButton).toBeInTheDocument();
    
      spyOnHandleRequest.mockClear();
      handleHttpResponse.mockClear();
      expect(handleHttpResponse.mock.calls.length).toEqual(0);
    
      fireEvent.submit(sendButton);
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
    
      fireEvent.submit(sendButton);
      await waitFor(() => {
      expect(spyOnHandleRequest.mock.calls.length).toEqual(1);
      expect(spyOnHandleRequest.mock.calls[0]).toEqual( [{"method": "GET", "url": "http://localhost:9000/"}]);
      expect(handleHttpResponse.mock.calls.length).toEqual(1);
      expect(handleHttpResponse.mock.calls[0]).toMatchObject([mockedData]);
      
    })
      
      
    });

} )

