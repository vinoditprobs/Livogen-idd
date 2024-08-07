import { Component, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { LeadsServiceService } from '../services/leads-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MsTransaltorService } from '../services/ms-translator.service';


@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent {

  title = 'livogen IDD';
  
  //Camrea Code
  @ViewChild('videoElement', { static: true }) videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement', { static: true }) canvasElement!: ElementRef<HTMLCanvasElement>;
  width = 540; // Custom width
  height = 677; // Custom height
  //Camrea Code

  modalRef?: BsModalRef;
  @ViewChild('cropImageModal') cropImageModal!: TemplateRef<any>;
  @ViewChild('staticTabs', { static: false }) staticTabs?: TabsetComponent;

  constructor( private modalService: BsModalService, private LeadsService: LeadsServiceService, private MsTransaltorServiceTool: MsTransaltorService) {}

  inputText!: string;
  overlayLoader: boolean | undefined;
  
  mediaStream!: MediaStream;
  showcapture: boolean = false

  imageChangedEvent: any = '';
  croppedImagePreview: any;
  getCroppedImageBlob: any;
  finalImageFile!: any;
  originalImageFile!: any
  selectedLanguage: string = 'en'

  progress: number = 0;
  interval: any;

  progressMessage: string | undefined
  
  generationStatus: any;
  generatedVideoLink: any;
  generatedBannerLink: any;

  selectTab(tabId: number) {
    if (this.staticTabs?.tabs[tabId]) {
      this.staticTabs.tabs[tabId].active = true;
    }
  }

  ngOnInit() {
    this.overlayLoader = false;
    console.log(this.selectedLanguage);


    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  onImageSelected(event: any) {
    this.originalImageFile = event.target.files[0];
  
    this.modalRef = this.modalService.show(this.cropImageModal, {class: 'modal-dialog-centered'});
    this.imageChangedEvent = event;

  }
  reEditImg(){
    if(this.originalImageFile){
      console.log(this.originalImageFile)
      this.modalRef = this.modalService.show(this.cropImageModal, {class: 'modal-dialog-centered'});
    }
  }
  closeModal() {
    if (this.modalRef) {
      this.modalRef.hide();
      this.modalRef = undefined; // Reset modalRef after closing
    }
  }
  
  imageCropped(event: ImageCroppedEvent): void {
    this.getCroppedImageBlob = event.blob;
    this.croppedImagePreview = event.objectUrl;
    this.finalImageFile = this.getCroppedImageBlob;
    //console.log(this.finalImageFile);
  }

  // Form Validation
  leadForm = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(5)]),
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]),
    address: new FormControl('', [Validators.required, Validators.minLength(20), Validators.maxLength(150)]),
  });

  translatedfullName: string = ''
  translatedPhoneNumber: string = ''
  translatedAddress: string = ''

  whileTyping() {
    const fullName = this.leadForm.controls.fullName.value;
    const phoneNumber = this.leadForm.controls.phoneNumber.value;
    const address = this.leadForm.controls.address.value;
    if (fullName) {
      this.MsTransaltorServiceTool.translateText(fullName).subscribe(
        (response) => {
          this.translatedfullName = response.translation;
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }
  
    if (phoneNumber) {
      this.MsTransaltorServiceTool.translateText(phoneNumber).subscribe(
        (response) => {
          this.translatedPhoneNumber = response.translation;
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }
  
    if (address) {
      this.MsTransaltorServiceTool.translateText(address).subscribe(
        (response) => {
          this.translatedAddress = response.translation;
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }
  }
  

  get fullName() {
    return this.leadForm.get('fullName');
  }
  get phoneNumber() {
    return this.leadForm.get('phoneNumber');
  }
  get address() {
    return this.leadForm.get('address');
  }
   // Form Validation

  submitLead() {
    if (!this.finalImageFile) {
        alert('Please upload photo!');
        return;
      }
    this.overlayLoader = true
    this.progress = 0;
    this.generationStatus = '';
  
    const formData = new FormData();
    formData.append('FilePathName', this.leadForm.controls.fullName.value ?? '');
    formData.append('Language', this.selectedLanguage); 
    formData.append('Photo', this.finalImageFile);
    if(this.selectedLanguage == 'hi'){
      formData.append('FullName', this.translatedfullName ?? this.leadForm.controls.fullName.value); 
      formData.append('Phone', this.translatedPhoneNumber ?? this.leadForm.controls.phoneNumber.value); 
      formData.append('Address', this.translatedAddress ?? this.leadForm.controls.address.value); 
    }else{
      formData.append('FullName', this.leadForm.controls.fullName.value ?? ''); 
      formData.append('Phone', this.leadForm.controls.phoneNumber.value ?? ''); 
      formData.append('Address', this.leadForm.controls.address.value ?? ''); 
    }

    this.progress = 0;
    this.interval = setInterval(() => {
      if (this.progress < 74) {
        this.progress++;
      } else {
        clearInterval(this.interval);
      }
    }, 400);
   
     
    this.LeadsService.createLead(formData).subscribe(
      (data) => {
        console.log(data);
    
        if (data.statusCode === 201) {
          console.log(data);
          this.overlayLoader = false;
          this.generatedVideoLink = data.result.VideoURL;
          this.generatedBannerLink = data.result.BannerURL;
          this.selectTab(3);
          this.progress = 100;
        } else {
          console.log('Oops, something went wrong');
          this.selectTab(3);
        }
      },
      (error) => {
        console.error('Error:', error);
        // Handle the error here
      }
      
    );
    
  }
 


  async startCamera() {
    try {
      const video = this.videoElement.nativeElement;
      const constraints = { video: { width: this.width, height: this.height } };
      this.mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      video.srcObject = this.mediaStream;
      video.play();
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  }

  capture() {
  const video = this.videoElement.nativeElement;
  const canvas = this.canvasElement.nativeElement;
  const context = canvas.getContext('2d');

  if (context) {
    canvas.width = this.width;
    canvas.height = this.height;

    // Add a slight delay to allow the video element to update
    setTimeout(async () => {
      context.drawImage(video, 0, 0, this.width, this.height);
      canvas.style.display = 'block';
      // Convert the canvas image to base64 format
      const pictureData = canvas.toDataURL('image/jpeg');
      this.showcapture = true

      const base64Response = await fetch(`${pictureData}`);
      const blob =  await base64Response.blob();
      
      const objectURL = URL.createObjectURL(blob);
     // console.log(objectURL);
      
      this.stopCamera();

      this.finalImageFile = blob

      this.croppedImagePreview = objectURL

      this.originalImageFile = ''

    }, 100); // Adjust the delay time as needed
  } else {
    console.error('Failed to get 2D context for canvas element.');
  }
  }


  reCapture(){
    const canvas = this.canvasElement.nativeElement;
    this.startCamera();
    this.showcapture = false
    canvas.style.display = 'none';
  }
  stopCamera(){
  if (this.mediaStream) {
    const tracks = this.mediaStream.getTracks();
    tracks.forEach(track => track.stop());
  }
  }


}


