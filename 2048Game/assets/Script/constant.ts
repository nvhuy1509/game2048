import { Color, Vec3 } from "cc";
import { Square } from "./square/square";

export type LevelConfig = { bgColor: Color, fontColor: Color, sprite: number };

export const NumberConfig: Record<string, LevelConfig> = {
    "2": {
        bgColor: Color.fromHEX(new Color(), "#e9dccf"),
        fontColor: Color.fromHEX(new Color(), "#452E0B"),
        sprite: 0
    },
    "4": {
        bgColor: Color.fromHEX(new Color(), "#e7b6d9"),
        fontColor: Color.fromHEX(new Color(), "#71512D"),
        sprite: 1
    },
    "8": {
        bgColor: Color.fromHEX(new Color(), "#f29e69"),
        fontColor: Color.fromHEX(new Color(), "#773D4C"),
        sprite: 2
    },
    "16": {
        bgColor: Color.fromHEX(new Color(), "#ef7647"),
        fontColor: Color.fromHEX(new Color(), "#82104D"),
        sprite: 3
    },
    "32": {
        bgColor: Color.fromHEX(new Color(), "#ef5b45"),
        fontColor: Color.fromHEX(new Color(), "#530B3F"),
        sprite: 4
    },
    "64": {
        bgColor: Color.fromHEX(new Color(), "#ee3d28"),
        fontColor: Color.fromHEX(new Color(), "#2A3248"),
        sprite: 5
    },
    "128": {
        bgColor: Color.fromHEX(new Color(), "#e4bf54"),
        fontColor: Color.fromHEX(new Color(), "#0B4A53"),
        sprite: 6
    },
    "256": {
        bgColor: Color.fromHEX(new Color(), "#E7C34F"),
        fontColor: Color.fromHEX(new Color(), "#27633D"),
        sprite: 7
    },
    "512": {
        bgColor: Color.fromHEX(new Color(), "#E7C34F"),
        fontColor: Color.fromHEX(new Color(), "#067029"),
        sprite: 8
    },
    "1024": {
        bgColor: Color.fromHEX(new Color(), "#C9963A"),
        fontColor: Color.fromHEX(new Color(), "#937200"),
        sprite: 9
    },
    "2048": {
        bgColor: Color.fromHEX(new Color(), "#C2BC2F"),
        fontColor: Color.fromHEX(new Color(), "#C96000"),
        sprite: 10
    },
    "4096": {
        bgColor: Color.fromHEX(new Color(), "#C2BC2F"),
        fontColor: Color.fromHEX(new Color(), "#B42B00"),
        sprite: 11
    },
    "8192": {
        bgColor: Color.fromHEX(new Color(), "#C2BC2F"),
        fontColor: Color.fromHEX(new Color(), "#B42B00"),
        sprite: 11
    },
    "16384": {
        bgColor: Color.fromHEX(new Color(), "#C2BC2F"),
        fontColor: Color.fromHEX(new Color(), "#B42B00"),
        sprite: 11
    },
    
}

export type Cell = {
    row: number;
    col: number;
}

export type CellData = {
    square: Square;
    overSquare?: Square;
}

export enum MoveDirection {
    UP = "up",
    DOWN = "down",
    LEFT = "left",
    RIGHT = "right"
}