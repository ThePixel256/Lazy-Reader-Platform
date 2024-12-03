import { Request,Response } from "express";
import { Task } from "../models/task";
import {AuthenticatedRequest} from "../models/AuthenticatedRequest";

export const postTask = async (req:Request, res:Response)=> {
    const {title,userId} = req.body
    await Task.create({
        title:title,
        state:'pending',
        isEdited:false,
        userId:userId,
    })
    res.json({
        msg:`Tarea ${title} se creo correctamente ^_^`
    })
}

export const getTaskByUserId  = async (req:Request,res:Response)=>{
    const authenticatedReq = req as AuthenticatedRequest;
    const userIdRequest = authenticatedReq.userId
    const userId = req.query.userId;
    if (userIdRequest !== Number(userId)){
        res.status(403).json({
            msg:`No tienes permisos para ver las tareas del usuario con id ${userId}`
        })
        return
    }
    const listTasks = await Task.findAll({where:{userId:userId}});
    res.json(listTasks)
}

export const updateTask = async (req:Request,res:Response)=>{
    const authenticatedReq = req as AuthenticatedRequest;
    const userId = authenticatedReq.userId;
    const {id} = req.params;
    const task: any = await Task.findOne({where:{id:id}});
    if  (userId !== Number(task.userId)){
        res.status(403).json({
            msg:`No tienes permisos para actualizar la tarea con id ${id}`
        })
        return
    }
    const {title,state, isEdited} = req.body
    await Task.update({
        title:title,
        state:state,
        isEdited:isEdited
    },{where:{id:id}})
    res.json({
        msg:`Tarea ${title} se actualizo correctamente ^_^`
    })
}

export const deleteTask = async (req:Request,res:Response)=>{
    const authenticatedReq = req as AuthenticatedRequest
    const userId = authenticatedReq.userId
    const {id} = req.params
    const task: any = await Task.findOne({where:{id:id}})
    if  (userId !== Number(task.userId)){
        res.status(403).json({
            msg:`No tienes permisos para eliminar la tarea con id ${id}`
        })
        return
    }
    await Task.destroy({where:{id:id}})
    res.json({
        msg:`Tarea con id ${id} se elimino correctamente ^_^`
    })
}