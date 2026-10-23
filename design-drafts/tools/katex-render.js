const katex=require('katex'); const fs=require('fs'); const path=require('path');
const eq={
 i_pi:['\\pi_\\theta(a_t \\mid o_t)',false],
 i_eps:['\\varepsilon\\sim\\mathcal{N}(0, I)',false],
 i_tau:['\\tau\\in[0,1]',false],
 i_ua:['u_a',false], i_uo:['u_o',false],
 e1:['\\mathcal{L}_{\\text{FM}}(\\theta)=\\mathbb{E}_{\\tau,\\,a^{0},\\,a^{1}}\\Big[\\big\\|\\,v_\\theta\\big(a^{\\tau},\\tau \\mid o_t\\big)-\\big(a^{1}-a^{0}\\big)\\big\\|^2\\Big],\\qquad a^{\\tau}=(1-\\tau)\\,a^{0}+\\tau\\,a^{1}',true],
 e2:['\\begin{aligned} a_t^{(\\tau+d\\tau)} &= a_t^{(\\tau)} + d\\tau\\, u_a\\!\\big(a_t^{(\\tau)},\\, o_{t+1}^{(\\tau)}\\big) \\\\ o_{t+1}^{(\\tau+d\\tau)} &= o_{t+1}^{(\\tau)} + d\\tau\\, u_o\\!\\big(o_{t+1}^{(\\tau)},\\, a_t^{(\\tau)}\\big) \\end{aligned}',true]
};
const out={}; for(const k in eq){ out[k]=katex.renderToString(eq[k][0],{displayMode:eq[k][1],output:'html',throwOnError:true}); }
const dist=path.dirname(require.resolve('katex/dist/katex.min.css'));
let css=fs.readFileSync(path.join(dist,'katex.min.css'),'utf8');
css=css.replace(/src:url\(fonts\/([^)]+?)\.woff2\) format\("woff2"\)[^;}]*/g,(m,f)=>'src:url(data:font/woff2;base64,'+fs.readFileSync(path.join(dist,'fonts',f+'.woff2')).toString('base64')+') format("woff2")');
out.__css=css; fs.writeFileSync(process.argv[2],JSON.stringify(out)); console.log('ok',Object.keys(out).length, (css.length/1024|0)+'KB css');
