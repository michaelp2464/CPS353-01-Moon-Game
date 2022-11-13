// Fill out your copyright notice in the Description page of Project Settings.


#include "CPP_ThirdPersonCharacter.h"
#include "Kismet/KismetMathLibrary.h"

// Sets default values
ACPP_ThirdPersonCharacter::ACPP_ThirdPersonCharacter()
{
 	// Set this character to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick = true;

}

// Called when the game starts or when spawned
void ACPP_ThirdPersonCharacter::BeginPlay()
{
	Super::BeginPlay();
	
}

// Called every frame
void ACPP_ThirdPersonCharacter::Tick(float DeltaTime)
{
	Super::Tick(DeltaTime);

}

// Called to bind functionality to input
void ACPP_ThirdPersonCharacter::SetupPlayerInputComponent(UInputComponent* PlayerInputComponent)
{
	Super::SetupPlayerInputComponent(PlayerInputComponent);

	PlayerInputComponent->BindAxis(TEXT("MoveForward"), this, &ACPP_ThirdPersonCharacter::MoveForward); 
	PlayerInputComponent->BindAxis(TEXT("MoveRight"), this, &ACPP_ThirdPersonCharacter::MoveRight);
	
	PlayerInputComponent->BindAxis(TEXT("Turn"), this, &ACPP_ThirdPersonCharacter::Turn);
	PlayerInputComponent->BindAxis(TEXT("LookUp"), this, &ACPP_ThirdPersonCharacter::LookUp);

	PlayerInputComponent->BindAxis(TEXT("TurnRate"), this, &ACPP_ThirdPersonCharacter::TurnRate);
	PlayerInputComponent->BindAxis(TEXT("LookUpRate"), this, &ACPP_ThirdPersonCharacter::LookUpRate);

	PlayerInputComponent->BindAction(TEXT("Jump"), EInputEvent::IE_Pressed, this, &ACharacter::Jump);
	PlayerInputComponent->BindAction(TEXT("Jump"), EInputEvent::IE_Released, this, &ACharacter::Jump);

	
}

void ACPP_ThirdPersonCharacter::MoveForward(float AxisValue){
	FVector Forward = UKismetMathLibrary::GetForwardVector(FRotator(0, GetControlRotation().Yaw, 0));
	AddMovementInput(Forward, AxisValue);
}


void ACPP_ThirdPersonCharacter::MoveRight(float AxisValue){
	FVector Right = UKismetMathLibrary::GetRightVector(FRotator(0, GetControlRotation().Yaw, 0));
	AddMovementInput(Right, AxisValue);

}



void ACPP_ThirdPersonCharacter::Turn(float AxisValue)
{
	AddControllerYawInput(AxisValue);
}

void ACPP_ThirdPersonCharacter::LookUp(float AxisValue)
{
	AddControllerPitchInput(AxisValue);
}

void ACPP_ThirdPersonCharacter::TurnRate(float AxisValue)
{
	AddControllerYawInput(AxisValue * BaseTurnRate * GetWorld()->GetDeltaSeconds());
}

void ACPP_ThirdPersonCharacter::LookUpRate(float AxisValue)
{
	AddControllerPitchInput(AxisValue * BaseLookUpRate * GetWorld()->GetDeltaSeconds());
}



