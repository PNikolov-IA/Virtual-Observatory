import { ObjectsController } from '../../objects/objects.controller';
import { ObjectsService } from '../../objects/objects.service';

describe('ObjectsController', () => {
  let mockObjectsService: jest.Mock<ObjectsService>;

  const objects = [{
    id: 1,
    identifier: 'NGC6744',
    coordinates: '10 21 45.22 +43 35 57.12',
    magnitude: 9,
    objectTypeId: null,
    spectralTypeId: null,
    description: 'spiral galaxy',
  },
  {
    id: 2,
    identifier: 'alf Lyr',
    coordinates: '18 35 14.66 +38 44 09.78',
    magnitude: 0.03,
    objectTypeI: null,
    spectralTypeId: null,
    description: 'Radial velocity / Red shift / cz : V(km/s) -20.60 [0.2];  Parallaxes (mas): 130.23 [0.36]',
  }];

  const object = {
    identifier: 'NGC67445',
    coordinates: '10 21 45.22 +43 35 57.13',
    magnitude: 9,
    description: 'spiral galaxy',
  };

  beforeEach(async () => {
    mockObjectsService = jest.fn<ObjectsService>().mockImplementation(() => ({
      getObjects: jest.fn().mockReturnValue(objects),
      getObjectById: jest.fn(),
      insertObject: jest.fn().mockReturnValue(object),
    }));
  });

  it('should call ObjectsService with getObjects method once', async () => {
    // Arrange
    const objectsService: ObjectsService = new mockObjectsService();
    const objectsController: ObjectsController = new ObjectsController(objectsService);

    const spy: jest.SpyInstance = jest.spyOn(objectsService, 'getObjects');

    // Act
    await objectsController.getAll();

    // Assert
    expect(spy).toBeCalledTimes(1);
  });

  it('getAll method should return correct values', async () => {
    // Arrange
    const objectsService: ObjectsService = new mockObjectsService();
    const objectsController: ObjectsController = new ObjectsController(objectsService);

    const obj: string = JSON.stringify(objects);

    // Act
    const result: string = JSON.stringify(await objectsController.getAll());

    // Assert
    expect(result).toBe(obj);
  });

  it('should call ObjectsService with getById method once', async () => {
    // Arrange
    const objectsService: ObjectsService = new mockObjectsService();
    const objectsController: ObjectsController = new ObjectsController(objectsService);

    const spy: jest.SpyInstance = jest.spyOn(objectsService, 'getObjectById');

    // Act
    await objectsController.getById(1);

    // Assert
    expect(spy).toBeCalledTimes(1);
  });

  it('getById method should return correct value', async () => {
    // Arrange
    mockObjectsService = jest.fn<ObjectsService>().mockImplementation(() => ({
      getObjectById: jest.fn().mockReturnValue(objects[0]),
    }));

    const objectsService: ObjectsService = new mockObjectsService();
    const objectsController: ObjectsController = new ObjectsController(objectsService);

    const obj: string = JSON.stringify(objects[0]);

    // Act
    const result: string = JSON.stringify(await objectsController.getById(1));

    // Assert
    expect(result).toBe(obj);
  });

  it('getById method should return the correct error message', async () => {
    // Arrange
    mockObjectsService = jest.fn<ObjectsService>().mockImplementation(() => ({
      getObjectById: jest.fn().mockImplementation(() => { throw new Error(); }),
    }));

    const objectsService: ObjectsService = new mockObjectsService();
    const objectsController: ObjectsController = new ObjectsController(objectsService);

    const obj = {
      statusCode: 404,
      error: 'Not Found',
      message: 'No such object.',
    };

    // Act & Assert
    try {
      await objectsController.getById(1);
    } catch (error) {
      expect(error.message).toEqual(obj);
    }
  });

  it('getById method should throw error', async () => {
    // Arrange
    mockObjectsService = jest.fn<ObjectsService>().mockImplementation(() => ({
      getObjectById: jest.fn().mockReturnValue(() => { throw new Error(); }),
    }));

    const objectsService: ObjectsService = new mockObjectsService();
    const objectsController: ObjectsController = new ObjectsController(objectsService);

    // Act
    const result = await objectsController.getById(1);

    // Assert
    expect(result).toThrow();
  });

  it('should call ObjectsService with insertObject method once', async () => {
    // Arrange
    const objectsService: ObjectsService = new mockObjectsService();
    const objectsController: ObjectsController = new ObjectsController(objectsService);

    const spy: jest.SpyInstance = jest.spyOn(objectsService, 'insertObject');

    // Act
    await objectsController.insertObject(object);

    // Assert
    expect(spy).toBeCalledTimes(1);
  });

  it('insertObject method should return correct value', async () => {
    // Arrange
    const objectsService: ObjectsService = new mockObjectsService();
    const objectsController: ObjectsController = new ObjectsController(objectsService);

    const obj: string = JSON.stringify(object);

    // Act
    const result: string = JSON.stringify(await objectsController.insertObject(object));

    // Assert
    expect(result).toBe(obj);
  });

  it('insertObject method should return the correct error message', async () => {
    // Arrange
    mockObjectsService = jest.fn<ObjectsService>().mockImplementation(() => ({
      insertObject: jest.fn().mockImplementation(() => { throw new Error(); }),
    }));

    const objectsService: ObjectsService = new mockObjectsService();
    const objectsController: ObjectsController = new ObjectsController(objectsService);

    const obj = {
      statusCode: 409,
      error: 'Conflict',
      message: 'The object already exist.',
    };

    // Act & Assert
    try {
      await objectsController.insertObject(object);
    } catch (error) {
      expect(error.message).toEqual(obj);
    }
  });

  it('insertObject method should throw error', async () => {
    // Arrange
    mockObjectsService = jest.fn<ObjectsService>().mockImplementation(() => ({
      insertObject: jest.fn().mockReturnValue(() => { throw new Error(); }),
    }));

    const objectsService: ObjectsService = new mockObjectsService();
    const objectsController: ObjectsController = new ObjectsController(objectsService);

    // Act
    const result = await objectsController.insertObject(object);

    // Assert
    expect(result).toThrow();
  });
});