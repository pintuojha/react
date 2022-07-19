import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
  render,
  cleanup,
  screen,
  waitFor,
  queryByAttribute,
  act,
  fireEvent,
} from '@testing-library/react';
import data from './data';
import Products from './src/components/Products/Products';
import Cart from './src/components/Cart/Cart';
import nock from 'nock';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

const filterResults = (query) => {
  if (query.length == 0) {
    return [...data];
  } else {
    return data.filter(
      (book) => book.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
};

const bookDetails = {
  location: {
    state: {
      name: 'Fifty Famous People: A Book of Short Stories',
      price: '1.99',
    },
  },
};

beforeAll(() => {
  nock('https://s3-ap-southeast-1.amazonaws.com')
    .persist()
    .get(`/he-public-data/book768fb92.json`)
    .query(true)
    .reply(200, data);
});

afterEach(cleanup);

describe('global tests', () => {
  describe('search tests', () => {
    test('when search is empty user can see all the data', async () => {
      render(
        <BrowserRouter>
          <Products />
        </BrowserRouter>
      );
      await waitFor(() => expect(screen.getByText(data[0].label)).toBeNo);
      data.forEach((book) =>
        expect(screen.getByText(book.label)).toBeInTheDocument()
      );
    });

    test('when search is valid,search should show proper elements', async () => {
      const getById = queryByAttribute.bind(null, 'id');
      const dom = render(
        <BrowserRouter>
          <Products />
        </BrowserRouter>
      );
      await waitFor(() => expect(screen.getByText(data[0].label)).toBeNo);
      const input = getById(dom.container, 'searchText');
      const listOfSearchItems = ['harry'];
      listOfSearchItems.forEach((item) => {
        userEvent.type(input, item);
        var fList = filterResults(item);
        data.forEach((eachData) => {
          if (fList.includes(eachData)) {
            expect(screen.getByText(eachData.name)).toBeInTheDocument();
          } else {
            expect(screen.queryByText(eachData.name)).not.toBeInTheDocument();
          }
        });
      });
    });

    test('when search is invalid, search should not show any element', async () => {
      const getById = queryByAttribute.bind(null, 'id');
      const dom = render(
        <BrowserRouter>
          <Products />
        </BrowserRouter>
      );
      await waitFor(() => expect(screen.getByText(data[0].label)).toBeNo);
      const input = getById(dom.container, 'searchText');
      const listOfSearchItems = ['some random text'];
      listOfSearchItems.forEach((item) => {
        userEvent.type(input, item);
        var fList = filterResults(item);
        data.forEach((eachData) => {
          if (fList.includes(eachData)) {
            expect(screen.getByText(eachData.name)).toBeInTheDocument();
          } else {
            expect(screen.queryByText(eachData.name)).not.toBeInTheDocument();
          }
        });
      });
    });
  });

  describe('Test cart validations', () => {
    test('validate card-number', () => {
      const getById = queryByAttribute.bind(null, 'id');
      const dom = render(<Cart {...bookDetails} />);

      const cardNumberInput = getById(dom.container, 'cardNumber');
      const cvvInput = getById(dom.container, 'CVV');
      const streetAddressInput = getById(dom.container, 'streetAddress');
      const cityInput = getById(dom.container, 'city');
      const zipCodeInput = getById(dom.container, 'zipCode');
      const emailInput = getById(dom.container, 'email');
      const dayInput = getById(dom.container, 'day');
      const monthInput = getById(dom.container, 'month');
      const yearInput = getById(dom.container, 'year');
      const sendOTPButton = screen.getByText('send otp');
      act(() => {
        userEvent.type(cardNumberInput, '1234');
        userEvent.type(cvvInput, '123');
        userEvent.type(streetAddressInput, 'some address');
        userEvent.type(cityInput, 'some city');
        userEvent.type(zipCodeInput, '712258');
        userEvent.type(emailInput, 'someEmail@email');
        userEvent.selectOptions(dayInput, ['1']);
        userEvent.selectOptions(monthInput, ['12']);
        userEvent.selectOptions(yearInput, ['2025']);
        userEvent.click(sendOTPButton);
      });
      expect(getById(dom.container, 'error')).not.toBeNull();
    });

    test('validate date', () => {
      const getById = queryByAttribute.bind(null, 'id');
      const dom = render(<Cart {...bookDetails} />);

      const cardNumberInput = getById(dom.container, 'cardNumber');
      const cvvInput = getById(dom.container, 'CVV');
      const streetAddressInput = getById(dom.container, 'streetAddress');
      const cityInput = getById(dom.container, 'city');
      const zipCodeInput = getById(dom.container, 'zipCode');
      const emailInput = getById(dom.container, 'email');
      const dayInput = getById(dom.container, 'day');
      const monthInput = getById(dom.container, 'month');
      const yearInput = getById(dom.container, 'year');
      const sendOTPButton = screen.getByText('send otp');
      act(() => {
        userEvent.type(cardNumberInput, '1234567890123456');
        userEvent.type(cvvInput, '123');
        userEvent.type(streetAddressInput, 'some address');
        userEvent.type(cityInput, 'some city');
        userEvent.type(zipCodeInput, '712258');
        userEvent.type(emailInput, 'someEmail@email');
        userEvent.selectOptions(dayInput, ['1']);
        userEvent.selectOptions(monthInput, ['1']);
        userEvent.selectOptions(yearInput, ['2021']);
        userEvent.click(sendOTPButton);
      });
      expect(getById(dom.container, 'error')).not.toBeNull();
    });

    test('validate cvv', () => {
      const getById = queryByAttribute.bind(null, 'id');
      const dom = render(<Cart {...bookDetails} />);

      const cardNumberInput = getById(dom.container, 'cardNumber');
      const cvvInput = getById(dom.container, 'CVV');
      const streetAddressInput = getById(dom.container, 'streetAddress');
      const cityInput = getById(dom.container, 'city');
      const zipCodeInput = getById(dom.container, 'zipCode');
      const emailInput = getById(dom.container, 'email');
      const dayInput = getById(dom.container, 'day');
      const monthInput = getById(dom.container, 'month');
      const yearInput = getById(dom.container, 'year');
      const sendOTPButton = screen.getByText('send otp');
      act(() => {
        userEvent.type(cardNumberInput, '1234567890123456');
        userEvent.type(cvvInput, '1234');
        userEvent.type(streetAddressInput, 'some address');
        userEvent.type(cityInput, 'some city');
        userEvent.type(zipCodeInput, '712258');
        userEvent.type(emailInput, 'someEmail@email');
        userEvent.selectOptions(dayInput, ['1']);
        userEvent.selectOptions(monthInput, ['12']);
        userEvent.selectOptions(yearInput, ['2025']);
        userEvent.click(sendOTPButton);
      });
      expect(getById(dom.container, 'error')).not.toBeNull();
    });

    test('validate otp', () => {
      const getById = queryByAttribute.bind(null, 'id');
      const dom = render(<Cart {...bookDetails} />);

      const cardNumberInput = getById(dom.container, 'cardNumber');
      const cvvInput = getById(dom.container, 'CVV');
      const streetAddressInput = getById(dom.container, 'streetAddress');
      const cityInput = getById(dom.container, 'city');
      const zipCodeInput = getById(dom.container, 'zipCode');
      const emailInput = getById(dom.container, 'email');
      const dayInput = getById(dom.container, 'day');
      const monthInput = getById(dom.container, 'month');
      const yearInput = getById(dom.container, 'year');
      const sendOTPButton = screen.getByText('send otp');

      act(() => {
        userEvent.type(cardNumberInput, '1234567890123456');
        userEvent.type(cvvInput, '123');
        userEvent.type(streetAddressInput, 'some address');
        userEvent.type(cityInput, 'some city');
        userEvent.type(zipCodeInput, '712258');
        userEvent.type(emailInput, 'someEmail@email');
        userEvent.selectOptions(dayInput, ['1']);
        userEvent.selectOptions(monthInput, ['12']);
        userEvent.selectOptions(yearInput, ['2025']);
      });
      act(() => {
        userEvent.click(sendOTPButton);
      });

      expect(getById(dom.container, 'error')).toBeNull();
      expect(getById(dom.container, 'popup')).not.toBeNull();

      const otpInput = getById(dom.container, 'OTP');
      const validateButton = screen.getByText('validate otp');

      act(() => {
        fireEvent.change(otpInput, { target: { value: '33' } });
        userEvent.click(validateButton);
      });
      expect(getById(dom.container, 'error')).not.toBeNull();
    });
  });
});
