//COMENTAIRE//
$(function(){
    let comment=$('#send-id')
   comment.on('submit',function(event){
       event.preventDefault()
       let comtval =$('#comt').val();
       let placeId=$('#place-id').text();
      //console.log(comtval,placeId);
       $.ajax({
           url:`http://localhost:3000/details/${placeId}`,
           method:'POST',
           data:{comtval},
           success:function(data,status_msg,status){
               console.log('voici ma donné');
               console.log(data);
           let div=$('<div>',{'class':'comt-place'});
           let content =`<p>${data.Comment.comment}.${data.Comment.dates}.${data.Comment.author}<p>`
           div.append(content);
           $('#comment-ctn').append(div)

           },
           error:function(info,status_msg,error){
               console.log(error)
           }

       })

 })
 })

//  //LIKES//
$(function(){
    let like=$('#form-like')
    like.on('submit',function(event){
        event.preventDefault()
        let likeVal=$('#like').val()
        let placeId=$('#place-id').text()
        if (likeVal !== isNaN){
            parseInt(likeVal)+1 
        
             $("#like").val(parseInt(likeVal)+ 1)
            }

        $.ajax({
            url:`http://localhost:3000/details/${placeId}/like`,
            dataType:'json',
            method:'POST',
            data:{likeVal},
            success:function(data,status_msg,status){
               
               console.log($('#like').val())
                console.log(data)
                $('#like-ctn').empty()
                let span=$('<span>',{'class':'like-place'});
                let content=` Like: ${likeVal}`
                span.append(content)
                $('#like-ctn').append(span)
            },
            error:function(info,status_msg,error){
                console.log(error)
            }


        })
        
    })
  })

// //SEARCH//
$(function(){
let search =$('#search');
console.log(search)
search.on('keyup',function(event){
    let valSearch =search.val()
    console.log(valSearch)
    if(valSearch.length>=3){
        $.ajax({
            url:`http://localhost:3000/search?query=${valSearch}`,
            method:"GET",
            dataType:'JSON',
            success:function(data,status,status_msg){
                console.log(data)
                let listplace =data.places;
                console.log(listplace)
                $('#contenair').empty();

                for(const Place of listplace){
                let div=$('<div>',{'class':'place'});
                let content= `<a <href="/details/${Place._id}"><img src="${Place.pathImage}"/></a><h3>${Place.name}</h3> .${Place.dates}.<p>${Place.description}</p>`
                div.append(content)
                $("#contenair").append(div)

            }
                

            },
            error:function(err,error_msg,error_status){
                console.log(err)
            }


        })
    }


})
})

