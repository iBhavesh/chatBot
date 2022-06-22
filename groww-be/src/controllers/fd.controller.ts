import { RequestHandler } from "express";
import {FD} from "../models";
import fdData from "../data/fd.json";

export const getAllFD: RequestHandler = async (req, res) => {
  const { skip = 0, limit = 10 } = req.query;
  try {
    const fds = await FD.find()
      .skip(+skip)
      .limit(+limit);
    return res.status(200).json(fds);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getFD: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const mf = await FD.findById( id );
    if (mf) return res.status(200).json(mf);
    else return res.status(200).send("Fixed Deposit not found");
  } catch (error) {
    res.status(400).send(error);
  }
};

export const buyFD: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  try {
    const fd = await FD.findById(id);
    if (fd) {
      return res.status(200).json(fd);
    } else {
      return res.status(200).send("Fixed Deposit not found");
    }
  } catch (error) {
    return res.status(400).send(error);
  }
}

export const populateFD:RequestHandler = async (req,res) => {
  try {
    for( const data of fdData) {
      await FD.create(data);
    }
    return res.send("FD populated");
  } catch(e) {
    return res.status(400).json({error:e})
  }
}