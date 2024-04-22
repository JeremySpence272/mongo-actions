"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
dotenv.config();
exports.app.use(express_1.default.json());
const mongoURI = process.env.mongoURI || "";
const recordSchema = new mongoose_1.default.Schema({
    title: String,
    body: String,
});
const Record = mongoose_1.default.model("Record", recordSchema);
exports.app.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.body.title;
    const body = req.body.body;
    if (!title || !body) {
        res.status(400).send("invalid record");
        return;
    }
    try {
        yield mongoose_1.default.connect(mongoURI);
        console.log("connected to server");
        const recordToPost = new Record({
            title: title,
            body: body,
        });
        const result = yield recordToPost.save();
        console.log(`A record was inserted with the id: ${result._id}`);
        res.status(201).send({ recordId: result._id });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            res.status(500).send("something went wrong");
        }
    }
    finally {
        yield mongoose_1.default.disconnect();
    }
}));
