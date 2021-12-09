const fs = require('fs')
const path = require('path');
// const articles = require('../client/articles')
// const { hasUncaughtExceptionCaptureCallback } = require('process');
const html = fs.readFileSync(path.resolve(__dirname, '../../homepage.html'), 'utf8');

describe('homepage.html', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    })
    describe('head', () => {
        test('it has a title', () => {
            const head = document.querySelector('head')
            expect(head).toBeTruthy();
            expect(head.textContent).toContain('HabiPad')
        })
        
        test('it is linked to a CSS style sheet', () => {
            let css = document.querySelector('link[rel="stylesheet"]');
            let link = css.getAttribute("href");
            let result = /.css$/i.test(link)
            expect(result).toBeTruthy()
        })   

        test('script tag is present', () => {
            let javascriptLink = document.querySelector('script');
            expect(javascriptLink).toBeTruthy()
        });

        test('script has a src attribute', () => {
            let javascriptLink = document.querySelector('script');
            let src = javascriptLink.getAttribute("src");
            expect(src).toBeTruthy();
        });  
    })

    describe('body', () => {
        test('it has a body', () => {
            const body = document.querySelector('body')
            expect(body).toBeTruthy();
        })

        test('it has a navbar', () => {
            const nav = document.querySelector('nav')
            expect(nav).toBeTruthy();
        })

        test('it has a form', () => {
            const form = document.querySelector('form')
            expect(form).toBeTruthy();
        })

        test('it has a submit button', () => {
            const body = document.querySelector('button')
            expect(body).toBeTruthy();
        })

    })

})    

