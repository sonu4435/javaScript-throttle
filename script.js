let url = "https://picsum.photos/v2/list?page=2&limit=100";
let finalApi = [];



let rect = document.querySelector("#rect");

    const throttleFunction = (func, delay) => {
      let prev = 0;
      return (...args) => {
        let now = new Date().getTime();
        if (now - prev > delay) {
          prev = now;
          return func(...args);
        }
      };
    };

    rect.addEventListener("mousemove", throttleFunction((dets) => {
        let div = document.createElement("div");
        div.classList.add("imageDiv");
        div.style.left = dets.clientX + 'px';
        div.style.top = dets.clientY + 'px';
        document.body.appendChild(div);
        let getApi = axios.get(url)
          .then(res => {
            let rand = Math.floor(Math.random() * 100);
            // finalApi = res.data[rand].download_url;
            let psh = res.data[rand].download_url;
            finalApi.push(psh);
            return res.data.download_url;
          })
          .catch(err => {
            console.log("error found - ", err);
          });

        let img = document.createElement("img");
        finalApi.forEach((e)=>{
            img.setAttribute("src", e);
        });
        div.appendChild(img);


        setTimeout(() => {
            div.remove();
        }, 1500);

        gsap.to(img,{
            y:"0",
            ease: Power2,
            duration: 1,
        })

        gsap.to(img,{
            y:"100%",
            delay: 1,
            ease: Power3,
        })


      }, 400));