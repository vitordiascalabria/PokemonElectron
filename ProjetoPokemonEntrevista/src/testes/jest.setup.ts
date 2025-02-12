import "@testing-library/jest-dom";
import "fast-text-encoding"; 
import "@testing-library/jest-dom";
import fetchMock from "jest-fetch-mock";


global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
fetchMock.enableMocks();