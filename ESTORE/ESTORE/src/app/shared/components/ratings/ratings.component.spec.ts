import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingsComponent } from './ratings.component';
import { IconDefinition,faStar,faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';

describe('RatingsComponent', () => {
  let component: RatingsComponent;
  let fixture: ComponentFixture<RatingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RatingsComponent]
    });
    fixture = TestBed.createComponent(RatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should assign value 5  to _score if passed value > 5',()=>{
    component.score = 6;
    expect(component['_score']).toEqual(5);//as it is private variable we pass it in [' ']
  });

  it('should assign 5 empty stars if the score is set to 0',()=>{
    component.score =0;
    expect(component.stars).toEqual([
      faStarEmpty,
      faStarEmpty,
      faStarEmpty,
      faStarEmpty,
      faStarEmpty
    ])
  });

  it('should assign 5 full stars if the score is set to 5',()=>{
    component.score = 5;
    expect(component.stars).toEqual([faStar,faStar,faStar,faStar,faStar])
  });

  it('should assign 3 full star, 1 empty star and 1 half filled star if value is 3.5',()=>{
    component.score = 3.5;
    expect(component.stars).toEqual([faStar,faStar,faStar,faStarHalfStroke,faStarEmpty])
  })


});
