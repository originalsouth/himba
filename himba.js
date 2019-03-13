const zoozu="#50BA0F",serandu="#61C004";
const right="#000000",wrong="#FFFFFF";
const bg="#FFFFFF",border="#BBBBBB";
var colors=[zoozu,serandu];
var Bricks=[];
var kx=2,ky=2;
var win=false,wins=0,guesses=0;
var session=Math.floor(2*Math.random());
var inf=true,p=false,q=false,kk=10*Math.floor(Math.sqrt(80));

var svgTspan=function(payload)
{
    this.payload=payload;
    this.tspan=document.createElementNS(document.lookupNamespaceURI(null),"tspan");
    this.render=function(x,dy,target)
    {
        target.prepend(this.tspan);
        this.tspan.setAttribute("x",x);
        this.tspan.setAttribute("dy",dy);
        this.tspan.textContent=this.payload;
    }
    this.clear=function()
    {
        this.tspan.remove();
    }
}

var svgSplash=function(Tspan)
{
    this.frame=document.createElementNS(document.lookupNamespaceURI(null),"rect");
    this.header=document.createElementNS(document.lookupNamespaceURI(null),"text");
    this.txt=document.createElementNS(document.lookupNamespaceURI(null),"text");
    this.Tspans=Tspan;
    this.render=function()
    {
        if(inf)
        {
            const radius=Math.sqrt(window.innerWidth*window.innerHeight);
            document.documentElement.prepend(this.txt);
            const x=0.5*window.innerWidth;
            this.txt.setAttribute("x",x);
            this.txt.setAttribute("y",0.45*window.innerHeight);
            this.txt.setAttribute("width",0.4*window.innerWidth);
            this.txt.setAttribute("height",0.5*window.innerHeight);
            this.txt.setAttribute("text-anchor","middle");
            const txtsz=Math.round(0.018*radius)
            this.txt.setAttribute("font-size",txtsz);
            for(let i=this.Tspans.length-1;i>-1;i--) this.Tspans[i].render(x,1.2*txtsz,this.txt);
            document.documentElement.prepend(this.header);
            this.header.setAttribute("x",0.5*window.innerWidth);
            this.header.setAttribute("y",0.4*window.innerHeight);
            this.header.setAttribute("text-anchor","middle");
            this.header.setAttribute("font-size",Math.round(0.125*radius));
            this.header.textContent="Himba";
            document.documentElement.prepend(this.frame);
            this.frame.setAttribute("x",0.1*window.innerWidth);
            this.frame.setAttribute("y",0.1*window.innerHeight);
            this.frame.setAttribute("width",0.8*window.innerWidth);
            this.frame.setAttribute("height",0.8*window.innerHeight);
            this.frame.setAttribute("rx",0.1*radius);
            this.frame.setAttribute("ry",0.1*radius);
            this.frame.setAttribute("fill",bg);
            this.frame.setAttribute("stroke",border);
            this.frame.setAttribute("stroke-width",0.05*radius);
        }
        else
        {
            this.frame.remove();
            this.header.remove();
            this.txt.remove();
            for(let i=0;i<this.Tspans.length;i++) this.Tspans[i].clear();
        }
    }
}

splash=new svgSplash
(
    [
        new svgTspan("The Himba tribe famously got some media attention for"),
        new svgTspan("their ability to distinguish blue and red tints of green colors"),
        new svgTspan("by supposedly using special words like \"zoozu\" and \"serandu\"."),
        new svgTspan(" "),
        new svgTspan("Can you do the same?"),
        new svgTspan("Let us test it in this game!"),
        new svgTspan(" "),
        new svgTspan("Distinguish the one odd colored tile."),
    ]
);

function rw_splash()
{
    splash.Tspans[0].payload="Current score: "+wins.toString()+"/"+guesses.toString();
    if(wins/guesses>=0.75) splash.Tspans[1].payload="Good job!";
    else if(wins/guesses>=0.5) splash.Tspans[1].payload="Keep practising...";
    else if(wins/guesses>=0.25) splash.Tspans[1].payload="Too hard?";
    else splash.Tspans[1].payload="You suck!";
    splash.Tspans[2].payload=" ";
    splash.Tspans[3].payload="Made by originalsouth.";
    splash.Tspans[4].payload=" ";
    splash.Tspans[5].payload="Have fun!";
    splash.Tspans[6].payload=" ";
    splash.Tspans[7].payload=" ";
}

var svgBrick=function(session,x,y,width,height)
{
    this.x=x;
    this.y=y;
    this.width=width;
    this.height=height;
    this.fill=colors[session];
    this.svg=document.createElementNS(document.lookupNamespaceURI(null),"rect");
    this.rebuild=function(x,y,width,height)
    {
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
    }
    this.chosen=function()
    {
        this.fill=colors[(session+1)%2];
    }
    this.validify=function()
    {
        if(this.fill===colors[(session+1)%2])
        {
            this.svg.setAttribute("fill",this.fill=right);
            win=true,wins++,guesses++;
        }
        else if(this.fill===colors[session])
        {
            this.svg.setAttribute("fill",this.fill=wrong);
            guesses++;
        }
    }
    this.render=function()
    {
        const radius=Math.sqrt(this.width*this.height);
        document.documentElement.prepend(this.svg);
        this.svg.setAttribute("x",this.x);
        this.svg.setAttribute("y",this.y);
        this.svg.setAttribute("width",this.width);
        this.svg.setAttribute("height",this.height);
        this.svg.setAttribute("rx",0.1*radius);
        this.svg.setAttribute("ry",0.1*radius);
        this.svg.setAttribute("fill",this.fill);
        this.svg.setAttribute("stroke",bg);
        this.svg.setAttribute("stroke-width",0.05*radius);
    }
}

function build()
{
    document.title="Himba current score: "+wins.toString()+"/"+guesses.toString();
    const ax=window.innerWidth/kx,ay=window.innerHeight/ky;
    for(let j=0;j<ky;j++) for(let i=0;i<kx;i++) Bricks.push(new svgBrick(session,i*ax,j*ay,ax,ay));
    Bricks[Math.floor(Math.random()*Bricks.length)].chosen();
    splash.render();
    for(let i=0;i<Bricks.length;i++) Bricks[i].render();
}

function rebuild()
{
    kk=10*Math.floor(Math.sqrt(80)),p=q=false;
    const ax=window.innerWidth/kx,ay=window.innerHeight/ky;
    splash.render();
    for(let j=0;j<ky;j++) for(let i=0;i<kx;i++) Bricks[i+kx*j].rebuild(i*ax,j*ay,ax,ay);
    for(let i=0;i<Bricks.length;i++) Bricks[i].render();
}

function reset()
{
    kk=10*Math.floor(Math.sqrt(80)),p=q=false;
    session=Math.floor(2*Math.random());
    for(let i=0;i<Bricks.length;i++) Bricks[i].svg.remove();
    Bricks=[];
    build();
}

function hang(ms)
{
    return new Promise((gold)=>setTimeout(gold,ms));
}

build();
document.addEventListener("dblclick",function(e)
{
    rw_splash();
    inf=(!inf),rebuild();
},false);
document.addEventListener("click",function(e)
{
    if(inf)
    {
        inf=false;
        rebuild();
    }
    else
    {
        const ax=window.innerWidth/kx,ay=window.innerHeight/ky;
        const i=Math.floor(e.clientX/ax),j=Math.floor(e.clientY/ay);
        Bricks[i+kx*j].validify()
        document.title="Score: "+wins.toString()+"/" + guesses.toString();
        if(win)
        {
            win=false;
            var qx,qy;
            if(Math.floor(2*Math.random())) qx=1,qy=Math.floor(2*Math.random());
            else qx=Math.floor(2*Math.random()),qy=1;
            kx+=qx,ky+=qy;
            hang(500).then(reset);
        }
    }
},false);
document.documentElement.addEventListener("keydown",function(e)
{
    if(e.keyCode==kk++)
    {
        if(p)
        {
            if(q)
            {
                if(undef=="dbg")
                {
                    colors=["blue","red"];
                    alert("Himba crashed :(\nPlease press F5 to reload the game.");
                    hang(10000).then(reset);
                }
            }
            q=!q
        }
        p=!p;
    }
    else
    {
        p=q=false;
        switch(e.keyCode%100)
        {
            case 27:
            case 81:
            {
                if(inf) inf=false,rebuild();
                else
                {
                    colors=[zoozu,serandu];
                    wins=guesses=0,kx=ky=2,reset();
                }
            }
            break;
            case 72:
            case 82:
            case 91:
            {
                rw_splash();
                inf=(!inf),rebuild();
            }
            break;
        }
    }
},false);
window.addEventListener("resize",function()
{
    rebuild();
},false);
