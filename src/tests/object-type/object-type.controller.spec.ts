import { ObjectTypeAlterDTO } from './../../models/objectType/object-type-alter.dto';
import { ObjectTypesController } from './../../object-type/object-types.controller';
import { ObjectTypesService } from './../../object-type/object-types.service';
import { ObjectTypeInsertDTO } from '../../models/objectType/object-type-insert.dto';
import { Repository, ObjectType } from 'typeorm';

// jest.mock('@nestjs/common');
describe('ObjectTypesController', () => {
    let mockObjectTypesService: jest.Mock<ObjectTypesService>;
    let mockObjectTypesRepository: jest.Mock<Repository<ObjectType<ObjectTypesController>>>;

    const objectTypes = [
        { id: 6, type: 'asteroid' },
        { id: 4, type: 'binary star' },
    ];

    beforeAll(async () => {
        mockObjectTypesService = jest.fn<ObjectTypesService>().mockImplementation(() => ({
            getObjectTypes: jest.fn().mockReturnValue(objectTypes),
        }));

        mockObjectTypesRepository = jest.fn<Repository<ObjectType<ObjectTypesController>>>().mockImplementation(() => ({
            create: jest.fn((dto: ObjectTypeInsertDTO) => dto),
            save: jest.fn((dto: ObjectTypeInsertDTO) => dto),
        }));
    });

    it('should call ObjectTypesService with getObjectTypes method once', async () => {
        // Arrange
        const objectTypesService = new mockObjectTypesService();
        const controller: ObjectTypesController = new ObjectTypesController(objectTypesService);

        const spy: jest.SpyInstance = jest.spyOn(objectTypesService, 'getObjectTypes');

        // Act
        await controller.getAll();

        // Assert
        expect(spy).toBeCalledTimes(1);
    });

    it('getAll method should return correct values', async () => {
        // Arrange
        const objectTypesService = new mockObjectTypesService();
        const controller: ObjectTypesController = new ObjectTypesController(objectTypesService);

        const objRef: string = JSON.stringify(objectTypes);

        // Act
        const result = JSON.stringify(await controller.getAll());

        // Assert
        expect(result).toBe(objRef);
    });

    it('getAll method should return correct error message', async () => {
        // Arrange
        const objRef: string = JSON.stringify({
            statusCode: 404,
            error: 'Not Found',
            message: 'No object types found.',
        });
        mockObjectTypesService = jest.fn<ObjectTypesService>().mockImplementation(() => ({
            getObjectTypes: jest.fn().mockImplementation(() => { throw new Error(objRef); }),
        }));

        const objectTypesService = new mockObjectTypesService();
        const controller: ObjectTypesController = new ObjectTypesController(objectTypesService);

        // Act & Assert
        try {
            await controller.getAll();
        } catch (e) {
            const error = e.message;
            expect(error).toBe(objRef);
        }
    });

    it('should call ObjectTypesService with getById method once', async () => {
        // Arrange
        mockObjectTypesService = jest.fn<ObjectTypesService>().mockImplementation(() => ({
            getObjectTypeById: jest.fn().mockReturnValue(objectTypes[0]),
        }));

        const objectTypesService = new mockObjectTypesService();
        const controller: ObjectTypesController = new ObjectTypesController(objectTypesService);

        const spy: jest.SpyInstance = jest.spyOn(objectTypesService, 'getObjectTypeById');

        // Act
        await controller.getById(1);

        // Assert
        expect(spy).toBeCalledTimes(1);
    });

    it('getById method should return correct value', async () => {
        // Arrange
        mockObjectTypesService = jest.fn<ObjectTypesService>().mockImplementation(() => ({
            getObjectTypeById: jest.fn().mockReturnValue(objectTypes[0]),
        }));

        const objectTypesService = new mockObjectTypesService();
        const controller: ObjectTypesController = new ObjectTypesController(objectTypesService);

        const objRef: string = JSON.stringify(objectTypes[0]);

        // Act
        const result = JSON.stringify(await controller.getById(1));

        // Assert
        expect(result).toBe(objRef);
    });

    it('getAll method should return the correct error message', async () => {
        // Arrange
        const objRef: string = JSON.stringify({
            statusCode: 404,
            error: 'Not Found',
            message: 'No such object type.',
        });

        mockObjectTypesService = jest.fn<ObjectTypesService>().mockImplementation(() => ({
            getObjectTypeById: jest.fn()
                .mockImplementation(() => { throw new Error(objRef); }),
        }));

        const objectTypesService = new mockObjectTypesService();
        const controller: ObjectTypesController = new ObjectTypesController(objectTypesService);

        // Act & Assert
        try {
            await controller.getById(1);
        } catch (e) {
            const error = JSON.stringify(e.message);
            expect(error).toBe(objRef);
        }
    });

    it('should call ObjectTypesService with insertObjectType method once', async () => {
        // Arrange
        const objType: ObjectTypeInsertDTO = { type: 'star' };

        mockObjectTypesService = jest.fn<ObjectTypesService>().mockImplementation(() => ({
            insertObjectType: jest.fn().mockReturnValue(objType),
        }));

        const objectTypesService = new mockObjectTypesService();
        const controller: ObjectTypesController = new ObjectTypesController(objectTypesService);

        const spy: jest.SpyInstance = jest.spyOn(objectTypesService, 'insertObjectType');

        // Act
        await controller.insertObjectType(objType);

        // Assert
        expect(spy).toBeCalledTimes(1);
    });

    it('insertObjectType method should return the correct value', async () => {
        // Arrange        //
        const objType: ObjectTypeInsertDTO = { type: 'star' };

        const objectTypesRepository = new mockObjectTypesRepository();
        const createdObjectTypeRepository = objectTypesRepository.create(objType);
        const savedObjectTypeRepository = objectTypesRepository.save(createdObjectTypeRepository);

        mockObjectTypesService = jest.fn<ObjectTypesService>().mockImplementation(() => ({
            insertObjectType: jest.fn().mockReturnValue(savedObjectTypeRepository),
        }));

        const objectTypesService = new mockObjectTypesService();
        const controller: ObjectTypesController = new ObjectTypesController(objectTypesService);

        // Act
        const result = await controller.insertObjectType(objType);

        // Assert
        expect(result).toBe(objType);
    });

    it('insertObjectType method should return correct error message when the object type already exist', async () => {
        // Arrange
        const objType: ObjectTypeInsertDTO = { type: 'star' };
        const objRef: string = JSON.stringify({
            statusCode: 409,
            error: 'Conflict',
            message: 'The object type already exist.',
        });

        mockObjectTypesService = jest.fn<ObjectTypesService>().mockImplementation(() => ({
            insertObjectType: jest.fn()
                .mockImplementation(() => { throw new Error(objRef); }),
        }));

        const objectTypesService = new mockObjectTypesService();
        const controller: ObjectTypesController = new ObjectTypesController(objectTypesService);

        // Act & Assert
        try {
            await controller.insertObjectType(objType);
        } catch (e) {
            const error = JSON.stringify(e.message);
            expect(error).toBe(objRef);
        }
    });

    it('insertObjectType method should throw error when the server failed', async () => {
        // Arrange
        const objType: ObjectTypeInsertDTO = { type: 'star' };

        mockObjectTypesService = jest.fn<ObjectTypesService>().mockImplementation(() => ({
            insertObjectType: jest.fn().mockReturnValue(() => { throw new Error(); }),
        }));

        const objectTypesService = new mockObjectTypesService();
        const controller: ObjectTypesController = new ObjectTypesController(objectTypesService);

        // Act
        const result = await controller.insertObjectType(objType);

        // Assert
        expect(result).toThrowError();
    });

    it('should call ObjectTypesService with alterObjectType method once', async () => {
        // Arrange
        const objType: ObjectTypeAlterDTO = {
            insertedType: 'star',
            typeToAlter: 'planet',
        };

        mockObjectTypesService = jest.fn<ObjectTypesService>().mockImplementation(() => ({
            alterObjectType: jest.fn().mockReturnValue(objType),
        }));

        const objectTypesService = new mockObjectTypesService();
        const controller: ObjectTypesController = new ObjectTypesController(objectTypesService);

        const spy: jest.SpyInstance = jest.spyOn(objectTypesService, 'alterObjectType');

        // Act
        await controller.alterObjectType(objType);

        // Assert
        expect(spy).toBeCalledTimes(1);
    });

    it('alterObjectType method should return the changed value', async () => {
        // Arrange        //
        const objType: ObjectTypeAlterDTO = {
            insertedType: 'star',
            typeToAlter: 'planet',
        };

        mockObjectTypesService = jest.fn<ObjectTypesService>().mockImplementation(() => ({
            alterObjectType: jest.fn().mockReturnValue(objType.typeToAlter),
        }));

        const objectTypesService = new mockObjectTypesService();
        const controller: ObjectTypesController = new ObjectTypesController(objectTypesService);

        // Act
        const result = await controller.alterObjectType(objType);

        // Assert
        expect(result).toBe(objType.typeToAlter);
    });

    it('alterObjectType method should throw error when the object type was not found', async () => {
        // Arrange        //
        const objType: ObjectTypeAlterDTO = {
            insertedType: 'star',
            typeToAlter: 'planet',
        };

        mockObjectTypesService = jest.fn<ObjectTypesService>().mockImplementation(() => ({
            alterObjectType: jest.fn().mockReturnValue(() => { throw new Error(); }),
        }));

        const objectTypesService = new mockObjectTypesService();
        const controller: ObjectTypesController = new ObjectTypesController(objectTypesService);

        // Act
        const result = await controller.alterObjectType(objType);

        // Assert
        expect(result).toThrowError();
    });

    it('alterObjectType method should throw the correct error message', async () => {
        // Arrange        //
        const objType: ObjectTypeAlterDTO = {
            insertedType: 'star',
            typeToAlter: 'planet',
        };

        const objRef: string = JSON.stringify({
            statusCode: 404,
            error: 'Not Found',
            message: 'No such object type.',
        });

        mockObjectTypesService = jest.fn<ObjectTypesService>().mockImplementation(() => ({
            alterObjectType: jest.fn().mockImplementation(() => { throw new Error(objRef); }),
        }));

        const objectTypesService = new mockObjectTypesService();
        const controller: ObjectTypesController = new ObjectTypesController(objectTypesService);

        // Act & Assert
        try {
            await controller.alterObjectType(objType);
        } catch (e) {
            const error = JSON.stringify(e.message);
            expect(error).toBe(objRef);
        }
    });
});
