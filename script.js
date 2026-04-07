(function(){
    function renderLattice(svgId, opts) {
        var svg = document.getElementById(svgId);
        if (!svg) return;
        var vb = svg.getAttribute('viewBox').split(' ');
        var W = parseInt(vb[2]), H = parseInt(vb[3]);
        var ox = W/2, oy = H/2 + 10;
        var b1 = opts.b1, b2 = opts.b2;
        var range = opts.range || 4;

        function gp(i,j) { return [ox + i*b1[0] + j*b2[0], oy - (i*b1[1] + j*b2[1])]; }
        function dist(i,j) { return Math.sqrt((i*b1[0]+j*b2[0])*(i*b1[0]+j*b2[0]) + (i*b1[1]+j*b2[1])*(i*b1[1]+j*b2[1])); }

        var mid = 'm'+svgId;
        var h = '<defs><marker id="'+mid+'" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>';

        for (var i=-range;i<=range;i++) {
            var p1=gp(i,-range), p2=gp(i,range);
            h+='<line x1="'+p1[0]+'" y1="'+p1[1]+'" x2="'+p2[0]+'" y2="'+p2[1]+'" stroke="rgba(0,0,0,0.07)" stroke-width="0.4"/>';
        }
        for (var j=-range;j<=range;j++) {
            var p1=gp(-range,j), p2=gp(range,j);
            h+='<line x1="'+p1[0]+'" y1="'+p1[1]+'" x2="'+p2[0]+'" y2="'+p2[1]+'" stroke="rgba(0,0,0,0.07)" stroke-width="0.4"/>';
        }

        var minD=1e9, si=0, sj=0;
        for (var i=-range;i<=range;i++) for (var j=-range;j<=range;j++) {
            if (i===0&&j===0) continue;
            var d=dist(i,j); if (d<minD){minD=d;si=i;sj=j;}
        }

        if (opts.showGapCircles) {
            var gamma = opts.gapFactor || 1.8;
            var outerR = minD * gamma;
            h+='<circle cx="'+ox+'" cy="'+oy+'" r="'+outerR+'" fill="#fef9c3" fill-opacity="0.5" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="6,3"/>';
            h+='<circle cx="'+ox+'" cy="'+oy+'" r="'+minD+'" fill="white" stroke="#2563eb" stroke-width="1.5" stroke-dasharray="5,3"/>';
            h+='<text x="'+(ox+5)+'" y="'+(oy-minD-5)+'" fill="#2563eb" font-size="11" font-family="sans-serif">d</text>';
            h+='<text x="'+(ox+5)+'" y="'+(oy-outerR-4)+'" fill="#f59e0b" font-size="11" font-family="sans-serif">γ·d</text>';
        }

        if (opts.showSVPCircle) {
            h+='<circle cx="'+ox+'" cy="'+oy+'" r="'+minD+'" fill="none" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="5,3" opacity="0.6"/>';
            h+='<text x="'+(ox+8)+'" y="'+(oy-minD-5)+'" fill="#dc2626" font-size="11" font-family="sans-serif">λ₁</text>';
        }
        if (opts.showGammaCircle) {
            var gr=minD*2;
            h+='<circle cx="'+ox+'" cy="'+oy+'" r="'+gr+'" fill="#f59e0b" fill-opacity="0.06" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="6,4"/>';
            h+='<text x="'+(ox+8)+'" y="'+(oy-gr-5)+'" fill="#f59e0b" font-size="11" font-family="sans-serif">γ·λ₁</text>';
            for (var i=-range;i<=range;i++) for (var j=-range;j<=range;j++) {
                if (i===0&&j===0) continue;
                var d=dist(i,j), p=gp(i,j);
                if (p[0]>5&&p[0]<W-5&&p[1]>5&&p[1]<H-5&&d<=gr&&d>minD)
                    h+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="6" fill="none" stroke="#f59e0b" stroke-width="1.5"/>';
            }
        }

        for (var i=-range;i<=range;i++) for (var j=-range;j<=range;j++) {
            var p=gp(i,j);
            if (p[0]>3&&p[0]<W-3&&p[1]>3&&p[1]<H-3) {
                var isO=i===0&&j===0;
                h+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="'+(isO?5:3)+'" fill="#5DCAA5" opacity="'+(isO?1:0.6)+'"/>';
                if (isO) h+='<text x="'+(p[0]+7)+'" y="'+(p[1]-7)+'" fill="#71717a" font-size="10" font-family="sans-serif">0</text>';
            }
        }

        if (opts.targetPoint) {
            var tpx=opts.targetPoint[0], tpy=opts.targetPoint[1];
            var minTD=1e9, ni=0, nj=0;
            for (var i=-range;i<=range;i++) for (var j=-range;j<=range;j++) {
                var lp=gp(i,j);
                var td=Math.sqrt((lp[0]-tpx)*(lp[0]-tpx)+(lp[1]-tpy)*(lp[1]-tpy));
                if (td<minTD){minTD=td;ni=i;nj=j;}
            }
            var np=gp(ni,nj);
            h+='<line x1="'+tpx+'" y1="'+tpy+'" x2="'+np[0]+'" y2="'+np[1]+'" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="5,3"/>';
            h+='<circle cx="'+np[0]+'" cy="'+np[1]+'" r="7" fill="none" stroke="#16a34a" stroke-width="2.2"/>';
            h+='<circle cx="'+tpx+'" cy="'+tpy+'" r="5" fill="#dc2626" opacity="0.9"/>';
            h+='<line x1="'+(tpx-6)+'" y1="'+tpy+'" x2="'+(tpx+6)+'" y2="'+tpy+'" stroke="white" stroke-width="1.5"/>';
            h+='<line x1="'+tpx+'" y1="'+(tpy-6)+'" x2="'+tpx+'" y2="'+(tpy+6)+'" stroke="white" stroke-width="1.5"/>';
            h+='<text x="'+(tpx+8)+'" y="'+(tpy-5)+'" fill="#dc2626" font-size="13" font-weight="600" font-family="sans-serif">t</text>';
        }

        if (opts.showSVPArrow) {
            var sp=gp(si,sj);
            h+='<line x1="'+ox+'" y1="'+oy+'" x2="'+sp[0]+'" y2="'+sp[1]+'" stroke="#dc2626" stroke-width="2.5" marker-end="url(#'+mid+')"/>';
        }

        if (opts.basisColor) {
            var c=opts.basisColor, op=opts.basisOpacity||1;
            h+='<line x1="'+ox+'" y1="'+oy+'" x2="'+(ox+b1[0])+'" y2="'+(oy-b1[1])+'" stroke="'+c+'" stroke-width="2.5" opacity="'+op+'" marker-end="url(#'+mid+')"/>';
            h+='<line x1="'+ox+'" y1="'+oy+'" x2="'+(ox+b2[0])+'" y2="'+(oy-b2[1])+'" stroke="'+c+'" stroke-width="2.5" opacity="'+op+'" marker-end="url(#'+mid+')"/>';
            h+='<text x="'+(ox+b1[0]+8)+'" y="'+(oy-b1[1]-5)+'" fill="'+c+'" font-size="13" font-weight="600" opacity="'+op+'" font-family="sans-serif">'+(opts.b1Label||'b₁')+'</text>';
            h+='<text x="'+(ox+b2[0]+8)+'" y="'+(oy-b2[1]-5)+'" fill="'+c+'" font-size="13" font-weight="600" opacity="'+op+'" font-family="sans-serif">'+(opts.b2Label||'b₂')+'</text>';
        }

        if (opts.altBasis) {
            var ab=opts.altBasis, ac=opts.altColor||'#dc2626';
            h+='<line x1="'+ox+'" y1="'+oy+'" x2="'+(ox+ab[0][0])+'" y2="'+(oy-ab[0][1])+'" stroke="'+ac+'" stroke-width="2.5" marker-end="url(#'+mid+')"/>';
            h+='<line x1="'+ox+'" y1="'+oy+'" x2="'+(ox+ab[1][0])+'" y2="'+(oy-ab[1][1])+'" stroke="'+ac+'" stroke-width="2.5" marker-end="url(#'+mid+')"/>';
            h+='<text x="'+(ox+ab[0][0]+8)+'" y="'+(oy-ab[0][1]-5)+'" fill="'+ac+'" font-size="13" font-weight="600" font-family="sans-serif">b₁\'</text>';
            h+='<text x="'+(ox+ab[1][0]-22)+'" y="'+(oy-ab[1][1]-5)+'" fill="'+ac+'" font-size="13" font-weight="600" font-family="sans-serif">b₂\'</text>';
        }

        svg.innerHTML = h;
    }

    function init() {
        var b1=[60,15], b2=[22,52];

        renderLattice('svg-lattice-def', {
            b1:b1, b2:b2, range:4, basisColor:'#2563eb'
        });

        renderLattice('svg-lattice-bases', {
            b1:b1, b2:b2, range:4,
            basisColor:'#16a34a', basisOpacity:1.0,
            altBasis:[[82,67],[142,82]], altColor:'#dc2626'
        });

        renderLattice('svg-lattice-svp', {
            b1:b1, b2:b2, range:4,
            showSVPCircle:true, showSVPArrow:true, showGammaCircle:true
        });

        renderLattice('svg-gapsvp', {
            b1:b1, b2:b2, range:4,
            showGapCircles:true, gapFactor:1.8
        });

        renderLattice('svg-cvp', {
            b1:[75,20], b2:[28,65], range:3,
            targetPoint:[194, 126]
        });

        renderLattice('svg-lll-bad', {
            b1:[100,8], b2:[90,35], range:3, basisColor:'#dc2626'
        });

        renderLattice('svg-lll-good', {
            b1:[35,28], b2:[-22,38], range:4, basisColor:'#16a34a'
        });

        // NP-Härte Beweis: SAT-Reduktion YES/NO
        renderLattice('svg-sat-yes', {
            b1:[32,8], b2:[8,32], range:4,
            showSVPArrow:true, showSVPCircle:true
        });

        renderLattice('svg-sat-no', {
            b1:[80,15], b2:[15,75], range:2
        });
    }

    if (document.readyState==='complete') init();
    else window.addEventListener('load', init);
})();

Reveal.initialize({
    hash: true,
    transition: 'slide',
    transitionSpeed: 'default',
    backgroundTransition: 'fade',
    center: true,
    width: 1200,
    height: 700,
    margin: 0.02,
    minScale: 0.1,
    maxScale: 2.0,
    slideNumber: 'c/t',
    plugins: [ RevealMath.KaTeX, RevealNotes ],
    katex: {
        version: 'latest',
        delimiters: [
            { left: '$$', right: '$$', display: true  },
            { left: '$',  right: '$',  display: false },
            { left: '\\(', right: '\\)', display: false },
            { left: '\\[', right: '\\]', display: true  }
        ]
    }
});