import {logger} from '..';
import {clear, memoryLogger, getLastLog, getLog} from '../loggers/memory';
import {consoleLogger} from '../loggers/console';
import {LogLevel} from '../types';

describe('Log utility', () => {
  beforeAll(() => {
    logger.setLogger(memoryLogger);
  });

  beforeEach(() => {
    clear();
    logger.clearMeta();
  });

  afterAll(() => {
    logger.setLogger(consoleLogger);
  });

  describe('Logging', () => {
    it('Should handle fatal errors', () => {
      logger.setLogLevel(LogLevel.FATAL);
      logger.fatal('Some fatal error', {});

      expect(getLastLog()).toEqual({
        message: 'Some fatal error',
        meta: {},
        logLevel: LogLevel.FATAL,
      });
    });

    it('Should handle errors', () => {
      logger.setLogLevel(LogLevel.ERROR);
      logger.error('Some error', {});

      expect(getLastLog()).toEqual({
        message: 'Some error',
        meta: {},
        logLevel: LogLevel.ERROR,
      });
    });

    it('Should handle warnings', () => {
      logger.setLogLevel(LogLevel.WARN);
      logger.warn('Some warning', {});

      expect(getLastLog()).toEqual({
        message: 'Some warning',
        meta: {},
        logLevel: LogLevel.WARN,
      });
    });

    it('Should handle info', () => {
      logger.setLogLevel(LogLevel.INFO);
      logger.info('Some info', {});

      expect(getLastLog()).toEqual({
        message: 'Some info',
        meta: {},
        logLevel: LogLevel.INFO,
      });
    });

    it('Should handle debugs', () => {
      logger.setLogLevel(LogLevel.DEBUG);
      logger.debug('Some debug', {});

      expect(getLastLog()).toEqual({
        message: 'Some debug',
        meta: {},
        logLevel: LogLevel.DEBUG,
      });
    });

    it('Should handle traces', () => {
      logger.setLogLevel(LogLevel.TRACE);
      logger.trace('Some trace', {});

      expect(getLastLog()).toEqual({
        message: 'Some trace',
        meta: {},
        logLevel: LogLevel.TRACE,
      });
    });
  });

  describe('Levels', () => {
    it('Should not log error if the log level is fatal', () => {
      logger.setLogLevel(LogLevel.FATAL);
      logger.error('Some error', {});

      expect(getLog()).toEqual([]);
    });

    it('Should not log warn if the log level is error', () => {
      logger.setLogLevel(LogLevel.ERROR);
      logger.warn('Some warning', {});

      expect(getLog()).toEqual([]);
    });

    it('Should log warn if the log level is info', () => {
      logger.setLogLevel(LogLevel.INFO);
      logger.warn('Some warning', {});

      expect(getLastLog()).toEqual({
        message: 'Some warning',
        meta: {},
        logLevel: LogLevel.WARN,
      });
    });
  });

  describe('Meta', () => {
    it('Should log meta that is passed in to the logger', () => {
      logger.setLogLevel(LogLevel.WARN);
      logger.warn('Some warning', {
        foo: 'bar',
      });

      expect(getLastLog()).toEqual({
        message: 'Some warning',
        meta: {
          foo: 'bar',
        },
        logLevel: LogLevel.WARN,
      });
    });

    it('Should log meta that is global', () => {
      logger.setLogLevel(LogLevel.WARN);
      logger.addMeta({
        foo: 'bar',
      });
      logger.warn('Some warning', {});

      expect(getLastLog()).toEqual({
        message: 'Some warning',
        meta: {
          foo: 'bar',
        },
        logLevel: LogLevel.WARN,
      });
    });
  });
});
