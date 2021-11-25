import { Request, Response } from 'express'
import shortId from 'shortid'
import { config } from '../config/Constants'

export class URLController{
    public async shorten(req: Request, res: Response): Promise<void> {
        //Verificar se a URL já não existe
        //Criar o hash para essa URL
        const { originURL } = req.body
        const hash = shortId.generate()
        const shortURL = `${config.API_URL}/${hash}`
        //Salvar a URL no DB
        //Retornar a URL que foi salva
        res.json({ originURL, hash, shortURL })
    }

    public async redirect(req: Request, res: Response): Promise<void> {
        //Pegar o hash da URL
        const { hash } = req.params
        //Encontrar a URL original pelo hash
        const url = {
            originURL: "https://cloud.mongodb.com/v2/618b3b3c77172744ef568413#clusters/detail/Cluster0/connect?clusterId=Cluster0",
            hash: "g1PEOqEUT",
            shortURL: "http://localhost:5000/g1PEOqEUT"
        }
        //Redirecionar para a URL original a partir do que for encontrado no DB
        res.redirect(url.originURL)
    }

}