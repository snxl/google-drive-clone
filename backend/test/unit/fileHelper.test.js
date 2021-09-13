import {
    describe,
    test,
    jest,
    expect,
  } from '@jest/globals';
  import fs, { stat } from "fs"
  import FileHelper from '../../src/fileHelper.js';
  import Routes from "../../src/routes/index.js"

  describe('#fileHelper', () => {

    describe("getFileStatus", () => {

        test('it should return files statuses in correct format', async () => {
            const statMock = {
                dev: 3432876991,
                mode: 33206,
                nlink: 1,
                uid: 0,
                gid: 0,
                rdev: 0,
                blksize: 4096,
                ino: 5910974510989787,
                size: 1427771,
                blocks: 2792,
                atimeMs: 1631219222709.3376,
                mtimeMs: 1631051553888.3186,
                ctimeMs: 1631051553888.3186,
                birthtimeMs: 1631219222693.7075,
                atime: '2021-09-09T20:27:02.709Z',
                mtime: '2021-09-07T21:52:33.888Z',
                ctime: '2021-09-07T21:52:33.888Z',
                birthtime: '2021-09-09T20:27:02.694Z'
            }

            const mockUser = 'snxl'
            process.env.USER = mockUser
            const filename = 'spooky-dance.gif'

            jest.spyOn(fs.promises, fs.promises.readdir.name)
                .mockResolvedValue([filename])

            jest.spyOn(fs.promises, fs.promises.stat.name)
                .mockResolvedValue(statMock)

            const result = await FileHelper.getFilesStatus("/tmp")

            const expectedResult = [
                {
                    size: '1.43 MB',
                    lastModified: statMock.birthtime,
                    owner: mockUser,
                    file: filename
                }
            ]

            expect(fs.promises.stat).toHaveBeenCalledWith(`/tmp/${filename}`)
            expect(result).toMatchObject(expectedResult)
        })

    })

  })
