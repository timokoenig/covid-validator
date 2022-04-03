import React from 'react'

/* eslint-disable no-undef */
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
global.localStorage = localStorageMock

// Mock chakra ProtalManager to create snapshot tests for modal views
const divWithChildrenMock = (children, identifier) => <div data-testId={identifier}>{children}</div>
const divWithoutChildrenMock = identifier => <div data-testId={identifier} />

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  PortalManager: jest.fn(({ children }) => divWithChildrenMock(children, 'portal')),
  Modal: jest.fn(({ children }) => divWithChildrenMock(children, 'modal')),
  ModalOverlay: jest.fn(({ children }) => divWithChildrenMock(children, 'overlay')),
  ModalContent: jest.fn(({ children }) => divWithChildrenMock(children, 'content')),
  ModalHeader: jest.fn(({ children }) => divWithChildrenMock(children, 'header')),
  ModalFooter: jest.fn(({ children }) => divWithChildrenMock(children, 'footer')),
  ModalBody: jest.fn(({ children }) => divWithChildrenMock(children, 'body')),
  ModalCloseButton: jest.fn(() => divWithoutChildrenMock('close')),
}))
