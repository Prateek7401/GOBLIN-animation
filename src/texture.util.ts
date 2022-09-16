import { BaseTexture, LoaderResource, Rectangle, Resource, Texture } from "pixi.js";

let resources: { [key: string]: LoaderResource };

export function setResources(r: { [key: string]: LoaderResource }): void {
  console.log('resources ', r);
  resources = r;
}

export function getTexturesFromSpriteSheet(name: string, f: Rectangle | Rectangle[]): Texture[] {
  const baseTexture = resources[name].texture?.baseTexture as BaseTexture;
  let textures: Texture[] = [];
  if (Array.isArray(f)) {
    f.forEach((frame) => textures.push(new Texture(baseTexture, frame)));
  } else {
    textures.push(new Texture(baseTexture, f));
  }
  return textures;
}

export function getTexture(name:string): Texture{
    return resources[name].texture as Texture;
}

export function getResource(name:string): LoaderResource {
  return resources[name];
}