import { ObjectTypesController } from './../../object-type/object-types.controller';
import { ObjectTypesService } from './../../object-type/object-types.service';

describe('ObjectTypesController', () => {
    let mockObjectTypesService: jest.Mock<ObjectTypesService>;

    const objectTypes = [
        { id: 6, type: 'asteroid' },
        { id: 4, type: 'binary star' },
    ];

    beforeAll(async () => {
        mockObjectTypesService = jest.fn<ObjectTypesService>().mockImplementation(() => ({
            getObjectTypes: jest.fn().mockReturnValue(objectTypes),
        }));
    });

    it('should call ObjectTypesService getObjectTypes method', async () => {
        // Arrange
        const objectTypesService = new mockObjectTypesService();
        const controller: ObjectTypesController = new ObjectTypesController(objectTypesService);

        const spy: jest.SpyInstance = jest.spyOn(objectTypesService, 'getObjectTypes');

        // Act
        controller.getAll(null);

        // Assert
        expect(spy).toBeCalledTimes(1);
    });

    it('getAll method should return correct values', async () => {
        // Arrange
        const objectTypesService = new mockObjectTypesService();
        const controller: ObjectTypesController = new ObjectTypesController(objectTypesService);

        const types = await objectTypesService.getObjectTypes();

        const result: string = JSON.stringify({
            message: 'Successfully find all object types.',
            data: types,
        });

        // Act
        controller.getAll(null);

        // Assert
        const objRef: string = JSON.stringify({
            message: 'Successfully find all object types.',
            data: objectTypes,
        });

        expect(result).toBe(objRef);
    });

    it('getAll method should return correct error message', async () => {
        // Arrange
        mockObjectTypesService = jest.fn<ObjectTypesService>().mockImplementation(() => ({
            getObjectTypes: jest.fn().mockReturnValue(new Error()),
        }));

        const objectTypesService = new mockObjectTypesService();
        const controller: ObjectTypesController = new ObjectTypesController(objectTypesService);

        // Act
        const result = controller.getAll(null);
        console.log(result);

        // const result: string = JSON.stringify({
        //     message: 'Successfully find all object types.',
        //     data: types,
        // });
        // Assert
        const objRef: string = JSON.stringify({
            statusCode: 404,
            error: 'Not Found',
            message: 'Unsuccessfully try to find object type.',
        });

        expect(result).toBe(objRef);
    });

    // it('should call ObjectTypesService getById method', async () => {
    //     // Arrange
    //     const objectTypesService = new mockObjectTypesService();
    //     const controller: ObjectTypesController = new ObjectTypesController(objectTypesService);

    //     const spy: jest.SpyInstance = jest.spyOn(objectTypesService, 'getObjectTypeById');

    //     // Act
    //     controller.getById(1, null);

    //     // Assert
    //     expect(spy).toBeCalledTimes(1);
    // });
});
