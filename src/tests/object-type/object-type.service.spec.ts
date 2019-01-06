import { ObjectTypesService } from './../../object-type/object-types.service';
import { ObjectTypeInsertDTO } from '../../models/objectType/object-type-insert.dto';

describe('ObjectTypesService', () => {
    let mockObjectTypesRepository: jest.Mock<any>;

    const objectTypes: any = [
        { id: 6, type: 'asteroid' },
        { id: 4, type: 'binary star' },
    ];

    beforeAll(async () => {

        mockObjectTypesRepository = jest.fn<any>()
            .mockImplementation(() => ({
                create: jest.fn<Promise<ObjectTypesService>>((dto: ObjectTypeInsertDTO) => dto),
                save: jest.fn<Promise<ObjectTypesService>>((dto: ObjectTypeInsertDTO) => dto),
                find: jest.fn<Promise<ObjectTypesService>>(() => objectTypes),
                findOneOrFail: jest.fn<Promise<ObjectTypesService>>((idStr: any) => {
                    idStr = idStr.where.id;
                    if (idStr === 1) {
                        return objectTypes[0];
                    }
                }),
                findOne: jest.fn<Promise<ObjectTypesService>>((idStr: any) => {
                    return null;
                }),
            }));
    });

    it('getObjectTypes module should be called once.', async () => {
        // Arrange
        const mockRepository = new mockObjectTypesRepository();
        const objectTypesService: ObjectTypesService = new ObjectTypesService(mockRepository);

        const spy: jest.SpyInstance = jest.spyOn(mockRepository, 'find');

        // Act
        await objectTypesService.getObjectTypes();

        // Assert
        expect(spy).toBeCalledTimes(1);
    });

    it('getObjectTypes module should return correct values.', async () => {
        // Arrange
        const mockRepository = new mockObjectTypesRepository();
        const objectTypesService: ObjectTypesService = new ObjectTypesService(mockRepository);

        // Act
        const result = await objectTypesService.getObjectTypes();

        // Assert
        expect(result).toBe(objectTypes);
    });

    it('getObjectTypeById module should be called once', async () => {
        // Arrange
        const mockRepository = new mockObjectTypesRepository();
        const objectTypesService: ObjectTypesService = new ObjectTypesService(mockRepository);

        const spy: jest.SpyInstance = jest.spyOn(mockRepository, 'findOneOrFail');

        // Act
        await objectTypesService.getObjectTypeById(1);

        // Assert
        expect(spy).toBeCalledTimes(1);
    });

    it('getObjectTypeById module should return correct value.', async () => {
        // Arrange
        const mockRepository = new mockObjectTypesRepository();
        const objectTypesService: ObjectTypesService = new ObjectTypesService(mockRepository);

        // Act
        const result = await objectTypesService.getObjectTypeById(1);

        // Assert
        expect(result).toBe(objectTypes[0]);
    });

    it('getObjectTypeById module should throw error when object type was not found.', async () => {
        // Arrange
        const mockObjectTypesRepo = jest.fn<any>().mockImplementation(() => ({
            findOneOrFail: jest.fn().mockReturnValue(() => {
                throw new Error();
            }),
        }));

        const mockRepository = new mockObjectTypesRepo();
        const objectTypesService: ObjectTypesService = new ObjectTypesService(mockRepository);

        // Act
        const result = await objectTypesService.getObjectTypeById(3);

        // Assert
        expect(result).toThrowError();
    });

    it('insertObjectType module should be called once.', async () => {
        // Arrange
        const objType: ObjectTypeInsertDTO = { type: 'star' };

        const mockRepository = new mockObjectTypesRepository();
        const objectTypesService: ObjectTypesService = new ObjectTypesService(mockRepository);

        const spy: jest.SpyInstance = jest.spyOn(mockRepository, 'findOne');

        // Act
        await objectTypesService.insertObjectType(objType);

        // Assert
        expect(spy).toBeCalledTimes(1);
    });
});