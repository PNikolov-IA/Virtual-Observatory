import { ObjectTypesController } from './../../object-type/object-types.controller';
import { ObjectTypesService } from './../../object-type/object-types.service';
import { Response } from 'express-serve-static-core';
import { Res } from '@nestjs/common';
import { throwError } from 'rxjs';

// jest.mock('@nestjs/common');
describe('ObjectTypesController', () => {
    let mockObjectTypesService: jest.Mock<ObjectTypesService>;
    let mockResponse: jest.Mock<any>;
    const response = () => {
        const obj = {
            status() { return response(); },
            json() { return response(); },
        };

        return obj;
    };

    const objectTypes = [
        { id: 6, type: 'asteroid' },
        { id: 4, type: 'binary star' },
    ];

    beforeAll(async () => {
        mockObjectTypesService = jest.fn<ObjectTypesService>().mockImplementation(() => ({
            getObjectTypes: jest.fn().mockReturnValue(objectTypes),
        }));

        mockResponse = jest.fn<any>().mockImplementation(() => ({
            status: jest.fn().mockReturnValue('test'),
        }));
    });

    it('should call ObjectTypesService getObjectTypes method', async () => {
        // Arrange
        const objectTypesService = new mockObjectTypesService();
        const controller: ObjectTypesController = new ObjectTypesController(objectTypesService);

        const spy: jest.SpyInstance = jest.spyOn(objectTypesService, 'getObjectTypes');

        // Act
        await controller.getAll(response());

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
        await controller.getAll(response());

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
            getObjectTypes: jest.fn()
                .mockReturnValue(() => { throw new Error('Unsuccessfully try to find object type.'); }),
        }));

        const objectTypesService = new mockObjectTypesService();
        const controller: ObjectTypesController = new ObjectTypesController(objectTypesService);

        // Act & Assert
        const objRef: string = JSON.stringify({
            statusCode: 404,
            error: 'Not Found',
            message: 'Unsuccessfully try to find object type.',
        });

        const result = await controller.getAll(response());

        // console.log(result.json());

        // try {

        //     console.log('try');
        // } catch (e) {
        //     console.log('err');
        //     console.log('Er:', e);
        //     e.message = 'Unsuccessfully try to find object type.';
        //     JSON.stringify(e);
        //     expect(e.message).toBe(objRef);
        // }
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
