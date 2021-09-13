import {
    describe,
    test,
    jest,
    expect,
} from '@jest/globals';
import Routes from '../../src/routes/index.js';
import fs from "fs"
import UploadHandler from '../../src/uploadHandler.js';
import TestUtil from '../_util/testUtil.js';

describe('#upload Handler test suit', () => {

    const ioObj = {
        to: (id) => ioObj,
        emit: (event, message) => {}
    }

    describe("#registerEvents", () => {

        test("should call onFile and onFinish functions on Busboy instance", ( ) => {

            const uploadHandler = new UploadHandler({
                io: ioObj,
                socketId: "01"
            })

            jest.spyOn(uploadHandler, uploadHandler.onFile.name).mockResolvedValue()

            const onFinish = jest.fn()

            const headers = {
                'content-type': 'multipart/form-data; boundary='
            }

            const busboyInstance = uploadHandler.registerEvents(headers, onFinish)

            const readable = TestUtil.generateReadableStream(['chunk', 'of', 'data'])

            busboyInstance.emit('file', 'fildname', readable, 'filename.txt')

            readable.on('data', msg => console.log(msg))

            busboyInstance.listeners('finish')[0].call()

            expect(uploadHandler.onFile).toHaveBeenCalled()

            expect(onFinish).toHaveBeenCalled()

        })

    })

    describe("#onFile", ( ) => {
        test("given a stream file it should save it on disk", async ( ) => {
            const chunk = ['hey', 'dude']

            const downloadsFolder = "/tmp"
            const handler = new UploadHandler({
                io: ioObj,
                socketId: '01',
                downloadsFolder
            })

            const onData = jest.fn

            jest.spyOn(fs, fs.createWriteStream.name)
                .mockImplementation(() => TestUtil.generateWritableStream(onData))

            const onTransform = jest.fn()

            jest.spyOn(handler, handler.handleFileBytes.name)
                .mockImplementation(() => TestUtil.generateTransformStream(onTransform))
        })
    })

})
