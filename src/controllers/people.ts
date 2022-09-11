import { Request, Response, NextFunction } from "express";
import logging from "../config/logging";
import { Connect, Query } from "../config/mysql";


const NAMESPACE = 'People'

const addPeople =(req:Request, res: Response, next: NextFunction)=>{
    logging.info(NAMESPACE, `Inserting people records`)
    let {id, first_name,last_name,email}=req.body
    
    let query = `INSERT INTO people (id, first_name, last_name, email) VALUES(${id},"${first_name}", "${last_name}", "${email}")`
    Connect()
    .then(connection=>{
        Query(connection, query)
        .then(result=>{
            return res.status(200).json({
                result
            })
        })
        .catch(error=>{
            logging.error(NAMESPACE, error.message, error)

            return res.status(500).json({
                message: error.message,
                error 
            })
        })
        .finally(()=>{
            connection.end()
        })
    })
    .catch(error=>{
        logging.error(NAMESPACE, error.message, error)

        return res.status(500).json({
            message: error.message,
            error
        })
    })
}
const deletePeople =(req:Request, res: Response, next: NextFunction)=>{
    logging.info(NAMESPACE, `Deleting people records`)
    let {id}=req.body
    
    let query = `DELETE FROM people WHERE id = ${id}`
    Connect()
    .then(connection=>{
        Query(connection, query)
        .then(result=>{
            return res.status(200).json({
                result
            })
        })
        .catch(error=>{
            logging.error(NAMESPACE, error.message, error)

            return res.status(500).json({
                message: error.message,
                error 
            })
        })
        .finally(()=>{
            connection.end()
        })
    })
    .catch(error=>{
        logging.error(NAMESPACE, error.message, error)

        return res.status(500).json({
            message: error.message,
            error
        })
    })
}
const updatePeople =(req:Request, res: Response, next: NextFunction)=>{
    logging.info(NAMESPACE, `Updating people records`)
    let {id,email}=req.body
    
    let query = `UPDATE people SET email = "${email}"  WHERE id = ${id} `
    Connect()
    .then(connection=>{
        Query(connection, query)
        .then(result=>{
            return res.status(200).json({
                result
            })
        })
        .catch(error=>{
            logging.error(NAMESPACE, error.message, error)

            return res.status(500).json({
                message: error.message,
                error 
            })
        })
        .finally(()=>{
            connection.end()
        })
    })
    .catch(error=>{
        logging.error(NAMESPACE, error.message, error)

        return res.status(500).json({
            message: error.message,
            error
        })
    })
}
const getPeopleAll = (req:Request, res: Response, next: NextFunction)=>{
    logging.info(NAMESPACE, `getting all people`)
    
    let query ='select * FROM people'

    Connect()
    .then(connection=>{
        Query(connection, query)
        .then(results=>{
            return res.status(200).json({
                results
            })
        })
        .catch(error=>{
            logging.error(NAMESPACE, error.message, error)

            return res.status(500).json({
                message: error.message,
                error 
            })
        })
        .finally(()=>{
            connection.end()
        })
    })
    .catch(error=>{
        logging.error(NAMESPACE, error.message, error)

        return res.status(500).json({
            message: error.message,
            error
        })
    })
}
export default { addPeople,updatePeople,deletePeople,getPeopleAll}