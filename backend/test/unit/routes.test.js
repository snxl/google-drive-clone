import {
  describe,
  test,
  jest,
  expect,
} from '@jest/globals';
import Routes from "../../src/routes/index.js"

describe('#Route test suit', () => {

    const defaultParams = {
        request: {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            method: '',
            body: {}
        },
        response: {
            setHeader: jest.fn(),
            writeHead: jest.fn(),
            end: jest.fn()
        },
        values: () => Object.values(defaultParams)
    }

    describe("#setSocketInstance", ()=>{

        test("setSocket should store io instance", ()=>{

            const routes = new Routes()

            const ioObj = {
                to: (id) => ioObj,
                emit: (event, message) => {}
            }

            routes.setSocketInstance(ioObj)
            expect(routes.io).toStrictEqual(ioObj)

        })

    })

    describe("#handler", ()=>{

        test("given an inexistent route it should choose default route", async ( ) =>{
            const route = new Routes()
            const params = {
                ...defaultParams
            }

            params.request.method = "undefined"
            await route.handler(...params.values())
            expect(params.response.end).toHaveBeenCalledWith("hello world")
        })

        test("it should set any request with CORS enabled", async ( ) =>{
            const route = new Routes()
            const params = {
                ...defaultParams
            }

            params.request.method = "undefined"
            await route.handler(...params.values())
            expect(params.response.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Origin', '*')
        })

        test("given method OPTIONS it should choose options route", async ( ) => {
            const route = new Routes()
            const params = {
                ...defaultParams
            }

            params.request.method = "OPTIONS"
            await route.handler(...params.values())
            expect(params.response.writeHead).toHaveBeenCalledWith(204)
        })

        test("given method POST it should choose post route", async ( ) => {
            const route = new Routes()
            const params = {
                ...defaultParams
            }

            params.request.method = "POST"
            jest.spyOn(route, route.post.name).mockResolvedValue()

            await route.handler(...params.values())
            expect(route.post).toHaveBeenCalled()
        })

        test('given method GET it should choose get route', async ( ) =>{
            const route = new Routes()
            const params = {
                ...defaultParams
            }

            params.request.method = "GET"
            jest.spyOn(route, route.get.name).mockResolvedValue()

            await route.handler(...params.values())
            expect(route.get).toHaveBeenCalled()
        })
    })

    describe("#GET", ()=>{
        test("given method GET it should list all files dowload", async ( ) =>{
            const routes = new Routes()

            const params = {
                ...defaultParams
            }

            const filesStatusesMock = [
                {
                    size: '1.43 MB',
                    lastModified: '2021-09-09T20:27:02.694Z',
                    owner: 'snxl',
                    file: 'spooky-dance.gif'
                }
            ]

            jest.spyOn(routes.fileHelper, routes.fileHelper.getFilesStatus.name)
                .mockResolvedValue(filesStatusesMock)

            params.request.method = 'GET'
            await routes.handler(...params.values())


            expect(params.response.writeHead).toHaveBeenCalledWith(200)
            expect(params.response.end).toHaveBeenCalledWith(JSON.stringify(filesStatusesMock))

        })
    })
});
