import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
freshnessList=["Brand New", "Second Hand", "Reowned"]
  productForm !:FormGroup
  actionBtn: string="Save";

constructor(private formbuilder:FormBuilder, private api:ApiService, private dialogref:MatDialogRef<DialogComponent>,
  @Inject(MAT_DIALOG_DATA) public editData:any) { }

  ngOnInit(): void {
    this.productForm=this.formbuilder.group({
      productName:['',Validators.required],
      category:['',Validators.required],
      freshness:['',Validators.required],
      price:['',Validators.required],
      comment:['',Validators.required],
      date:['',Validators.required]
    });

    if(this.editData){
      this.actionBtn="Update"
      this.productForm.controls['productName'].setValue(this.editData.productName)
      this.productForm.controls['category'].setValue(this.editData.category)
      this.productForm.controls['freshness'].setValue(this.editData.freshness)
      this.productForm.controls['price'].setValue(this.editData.price)
      this.productForm.controls['comment'].setValue(this.editData.comment)
      this.productForm.controls['date'].setValue(this.editData.date)

    }
  }
  addproduct(){
   if(this.editData){
    if(this.productForm.valid){
      this.api.postProduct(this.productForm.value).subscribe({
        next:(_res)=>{
          alert("product added successfully")
          this.productForm.reset();
          this.dialogref.close('save');
        },
          error:()=>{
            alert("error while adding the product")
          }
        
      })
    }
   }else{
     this.updateProduct()
   }
  }
  
   updateProduct(){
     this.api.putProduct(this.productForm.value,this.editData.id).subscribe({
       next:(res)=>{
         alert("product updated Successfully")
         this.productForm.reset();
         this.dialogref.close('update')
       }
     })

   }

}
