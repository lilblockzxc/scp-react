export class Cell {
  constructor(
    public x: number,
    public y: number,
    private element: RSPElement = null
  ) {}

  get isEmpty() {
    return this.element == null;
  }

  setElement(e: RSPElement) {
    this.element = e;
  }
  clearElement() {
    this.element = null;
  }

  getElement() {
    return this.element;
  }
}
export const K = 100;
export enum ElementType {
  scis,
  rock,
  paper,
}
export class Area {
  width: number;
  height: number;
  getCellByCoord(newX: number, newY: number) {
    return this.cells.find((cell) => cell.x == newX && cell.y == newY);
  }
  cells: Cell[];
  //todo define size of area, fill objects,.....
  generateArea(width: number, height: number, eCount: number) {
    this.cells = [];
    this.width = width;
    this.height = height;
    this.createCells(width, height);
    this.createElements(eCount);
  }

  private createCells(width: number, height: number) {
    let x = width;

    while (x > 0) {
      let y = height;
      while (y > 0) {
        this.cells.push(new Cell(x, y));
        y--;
      }
      x--;
    }
  }
  readonly elements: RSPElement[] = [];

  private createElements(eCount: number) {
    //this.elements=[]
    while (eCount > 0) {
      for (let type = ElementType.scis; type <= ElementType.paper; type++) {
        const element = new RSPElement(type, this);
        this.elements.push(element);
        while (true) {
          let x = Math.round((this.width - 1) * Math.random()) + 1;
          //w = 5-1
          //0, 0.5, 1 => (0, 1,2, 3, 4)+1=>1..5
          let y = Math.round((this.height - 1) * Math.random()) + 1;
          const cell = this.getCellByCoord(x, y);
          if (cell.isEmpty) {
            cell.setElement(element);
            break;
          }
        }
      }
      eCount--;
    }
  }

  // win:boolean = false;

  run() {
    while (true) {
      //turn
      this.elements.forEach((x) => {
        x.move();
      });

      //calc win or not
      //   const noRock =
      //     this.cells.filter((x) => x.element.type == ElementType.rock)
      //       .length == 0;
      //   const noPaper =
      //     this.cells.filter((x) => x.element.type == ElementType.paper)
      //       .length == 0;
      //   const noSciss =
      //     this.cells.filter((x) => x.element.type == ElementType.scis)
      //       .length == 0;

      //   const winScis = noRock && noPaper;
      //   const winRock = noPaper && noSciss;
      //   const winPaper = noSciss && noRock;
      //const win = winScis || winRock || winPaper;

      //let win = true;

      let winType: ElementType = null;
      const win = !this.cells.some((cell) => {
        if (!cell.isEmpty) {
          if (winType == null) {
            winType = cell.getElement().type;
          } else {
            if (winType != cell.getElement().type) {
              return true;
            }
          }
        }
        return false;
      });

      if (win) {
        break;
      }
    }
    //
  }
}

export class RSPElement {
  constructor(public type: ElementType, private area: Area) {}
  targetCell: Cell;
  move() {
    //element idet na 1 kletku v storonu targetCell, kogda doshel - menyaem target, kogda target net (initail state) - menyaem target

    if (this.targetCell == null || this.currentCell == this.targetCell) {
      this.setNewTarget();
    } else {
      this.makeOneStep();
    }
  }

  get currentCell() {
    const myCell = this.area.cells.find((x) => x.getElement() == this);
    return myCell;
  }

  get Coord() {
    return { x: this.currentCell.x, y: this.currentCell.y };
  }
  private setNewTarget() {
    while (true) {
      let x = Math.round((this.area.width - 1) * Math.random()) + 1;
      let y = Math.round((this.area.height - 1) * Math.random()) + 1;
      if (this.Coord.x != x || this.Coord.y != y) {
        const cell = this.area.getCellByCoord(x, y);
        this.targetCell = cell;
        return;
      }
    }
  }
  private makeOneStep() {
    //let stepX,stepY:number
    const distX = this.targetCell.x - this.currentCell.x;
    const distY = this.targetCell.x - this.currentCell.y;
    const stepX = Math.abs(distX) >= 1 ? (distX < 0 ? -1 : 1) : 0;
    const stepY = Math.abs(distY) >= 1 ? (distY < 0 ? -1 : 1) : 0;
    const newX = this.currentCell.x + stepX;
    const newY = this.currentCell.y + stepY;
    const nextCell = this.area.getCellByCoord(newX, newY);
    if (nextCell.isEmpty) {
      nextCell.setElement(this);
      this.currentCell.clearElement();
    } else {
      if (this.type == nextCell.getElement().type) {
        this.targetCell = null; //find targtet on next move;
        //this.findNewTarget();
      } else {
        const loser = this.whoLose(nextCell.getElement());
        const winner = this.whoWin(nextCell.getElement());
        loser.type = winner.type;
      }
    }
  }

  private whoWin(other: RSPElement): RSPElement {
    if (this.type == ElementType.rock) {
      if (other.type == ElementType.scis) {
        return this;
      } else {
        return other; //paper
      }
    }
    if (this.type == ElementType.scis) {
      if (other.type == ElementType.paper) {
        return this;
      } else {
        return other; //rock
      }
    }
    if (this.type == ElementType.paper) {
      if (other.type == ElementType.rock) {
        return this;
      } else {
        return other; //scis
      }
    }
  }

  private whoLose(other: RSPElement): RSPElement {
    if (this.type == ElementType.rock) {
      if (other.type == ElementType.scis) {
        return other;
      } else {
        return this;
      }
    }
    if (this.type == ElementType.scis) {
      if (other.type == ElementType.paper) {
        return other;
      } else {
        return this;
      }
    }
    if (this.type == ElementType.paper) {
      if (other.type == ElementType.rock) {
        return other;
      } else {
        return this;
      }
    }
  }

  //   private x:number;

  //   get X(){
  //     return this.x;
  //   }
  //   set X(newvalue){
  //       if (newvalue>3) {
  //             this.x = newvalue+3;
  //       }
  //   }
}

// var e = new AreaElement(ElementType.paper,null);
// e.X = 2;

//programm
//   let x = new Area();
//   x.generateArea();
//x.run();
