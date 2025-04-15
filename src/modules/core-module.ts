import regl from 'regl'
import { GraphConfigInterface } from '@/graph/config'
import { GraphData } from '@/graph/modules/GraphData'
import { Points } from '@/graph/modules/Points'
import { Store } from '@/graph/modules/Store'


function loadTexture(
    gl: WebGLRenderingContext,
    url: string
): Promise<WebGLTexture> {
    console.log("taaaaq");

    return new Promise((resolve, reject) => {
        console.log("taaaaq");
        const image = new Image();
        image.crossOrigin = "anonymous";
        image.onload = () => {
            const texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(
                gl.TEXTURE_2D,
                0,
                gl.RGBA,
                gl.RGBA,
                gl.UNSIGNED_BYTE,
                image
            );

            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(
                gl.TEXTURE_2D,
                gl.TEXTURE_WRAP_S,
                gl.CLAMP_TO_EDGE
            );
            gl.texParameteri(
                gl.TEXTURE_2D,
                gl.TEXTURE_WRAP_T,
                gl.CLAMP_TO_EDGE
            );

            resolve(texture);
        };
        image.onerror = reject;
        image.src = url;
    });
}

export class CoreModule {
  public readonly reglInstance: regl.Regl
  public readonly config: GraphConfigInterface
  public readonly store: Store
  public readonly data: GraphData
  public readonly points: Points | undefined
  public texture: WebGLTexture | null = null;

  public constructor (
    reglInstance: regl.Regl,
    config: GraphConfigInterface,
    store: Store,
    data: GraphData,
    points?: Points
  ) {
    this.reglInstance = reglInstance
    this.config = config
    this.store = store
    this.data = data
    if (points) this.points = points
    


    loadTexture(
        this.reglInstance._gl,
        "http://localhost:4177/graph-icons/user4.png"
    )
        .then((texture) => {
            this.texture = texture;
            console.log("Texture loaded successfully");
        })
        .catch((err) => {
            console.error("Failed to load texture:", err);
        });
  }
}
